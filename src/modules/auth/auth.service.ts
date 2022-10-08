import { Body, ConsoleLogger, HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../../entities/user.entity';
import { Repository } from 'typeorm';
import { AuthDto, TokenTypes } from './dto/auth.dto';
import { JwtService } from '@nestjs/jwt';
import { ForgotPasswordDto } from './dto/forgot-password.dto';
import { MailerService } from '@nestjs-modules/mailer';
import { ForgotPassword } from '../../entities/forgot-password.entity';
import { RestorePasswordDto } from './dto/restore-password.dto';
import { randomBytes } from 'crypto';
import * as bcrypt from 'bcrypt';
import { UpdateDto } from './dto/update.dto';
import { ChangePasswordDto } from './dto/change-password.dto';

const SALT_NUMBER = 8;

const sgMail = require('@sendgrid/mail');
@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>,
    private readonly jwtService: JwtService,
    private readonly mailerService: MailerService,
    @InjectRepository(ForgotPassword)
    private readonly forgotPasswordRepository: Repository<ForgotPassword>,
  ) {}

  async signUp(@Body() AuthDto: AuthDto): Promise<User> {
    const { password, email, role } = AuthDto;
    const isUsed = await this.usersRepository.findOneBy({ email });
    console.log(isUsed, 'isUsed');
    if (isUsed) {
      throw new HttpException(
        {
          status: HttpStatus.BAD_REQUEST,
          error: 'This email already exist.',
        },
        HttpStatus.BAD_REQUEST,
      );
    }
    const hashedPassword = await bcrypt.hash(password, SALT_NUMBER);
    return await this.usersRepository.save({ email, password: hashedPassword, googleId: '', role });
  }

  async update(@Body() authDto: Partial<UpdateDto>): Promise<User> {
    const { email, role } = authDto;
    const user = await this.usersRepository.findOneBy({ email });
    user.role = role;
    return await this.usersRepository.save(user);
  }

  async signIn(@Body() AuthDto: AuthDto): Promise<TokenTypes> {
    const { email, password } = AuthDto;
    const user: User = await this.usersRepository.findOneBy({ email });
    if (!user) {
      throw new HttpException(
        {
          status: HttpStatus.BAD_REQUEST,
          error: 'No such account',
        },
        HttpStatus.BAD_REQUEST,
      );
    }
    const isMatch = bcrypt.compareSync(password, user.password); // unhash password
    if (!isMatch) {
      throw new HttpException(
        {
          status: HttpStatus.BAD_REQUEST,
          error: 'Incorrect password',
        },
        HttpStatus.BAD_REQUEST,
      );
    }
    const access_token = this.jwtService.sign(
      { userId: user.id, email: user.email },
      {
        secret: process.env.JWT_SECRET,
        expiresIn: process.env.JWT_EXPIRE_TIME,
      },
    );
    return { access_token, userId: user.id, role: user.role };
  }

  async googleSignUp(req) {
    const { googleId, email } = req.user;
    const user = await this.usersRepository.findOneBy({ googleId });
    if (user) return this.googleSignIn(user);
    const newUser = await this.usersRepository.save({ email, googleId, password: '' });
    return this.googleSignIn(newUser);
  }
  async googleSignIn(user) {
    return {
      token: this.jwtService.sign(
        {
          userId: user.id,
        },
        {
          secret: process.env.JWT_SECRET,
          expiresIn: process.env.JWT_EXPIRE_TIME,
        },
      ),
      userId: user.id,
    };
  }

  async forgotPassword({ email }: ForgotPasswordDto) {
    const user = await this.usersRepository.findOneBy({ email });
    if (!user) {
      throw new HttpException(
        {
          status: HttpStatus.BAD_REQUEST,
          error: 'Email address is not valid',
        },
        HttpStatus.BAD_REQUEST,
      );
    } else {
      const hash = randomBytes(20).toString('hex'); //create random hashed link

      await this.forgotPasswordRepository.save({
        user: user,
        link: hash,
      });

      const url = process.env.RESET_PASSWORD_URL + hash;
      sgMail.setApiKey(process.env.SENDGRID_API_KEY);
      const msg = {
        to: email,
        from: 'silvagabis162@gmail.com',
        subject: 'Devs Heads restore password',
        html: `<h1>Change password</h1><p>If you want to reset your password click:</p><a href="${url}">${url}</a>`,
      };

      sgMail
        .send(msg)
        .then(() => {
          console.log('Email sent');
        })
        .catch((e) => {
          console.error(e);
        });
    }
  }
  async restorePassword({ token, password }: RestorePasswordDto) {
    const { user } = await this.forgotPasswordRepository.findOne({
      where: {
        link: token,
      },
      relations: {
        user: true,
      },
    });

    if (user) {
      const newPassword = bcrypt.hashSync(password, SALT_NUMBER);
      const updatedUser = await this.usersRepository.update({ id: user.id }, { password: newPassword });

      if (updatedUser) {
        await this.forgotPasswordRepository.delete({ link: token });
      }
      return updatedUser;
    } else {
      throw new HttpException(
        {
          status: HttpStatus.BAD_REQUEST,
          error: 'Wrong link',
        },
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  async changePassword({ email, oldPassword, newPassword }: ChangePasswordDto) {
    const user = await this.usersRepository.findOneBy({ email: email });
    const isMatch = bcrypt.compareSync(oldPassword, user.password); // hash password
    if (!isMatch) {
      throw new HttpException(
        {
          status: HttpStatus.BAD_REQUEST,
          message: 'Incorrect old password',
        },
        HttpStatus.BAD_REQUEST,
      );
    }
    if (oldPassword === newPassword) {
      throw new HttpException(
        {
          status: HttpStatus.BAD_REQUEST,
          message: 'Old and new password the same',
        },
        HttpStatus.BAD_REQUEST,
      );
    }
    const password = bcrypt.hashSync(newPassword, SALT_NUMBER);
    await this.usersRepository.update({ id: user.id }, { password: password });
  }
  async getUser() {
    const user = await this.usersRepository.find();
    return user;
  }
}
