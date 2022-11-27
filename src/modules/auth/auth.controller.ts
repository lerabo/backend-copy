import { Body, Controller, Get, Post, Put, Req, Res, UseGuards } from '@nestjs/common';
import { User } from '../../entities/user.entity';
import { AuthService } from './auth.service';
import { AuthDto, SwaggerTokenTypes, TokenTypes } from './dto/auth.dto';
import { AuthGuard } from '@nestjs/passport';
import { ForgotPasswordDto } from './dto/forgot-password.dto';
import { RestorePasswordDto } from './dto/restore-password.dto';
import { ChangePasswordDto } from './dto/change-password.dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @ApiOperation({ summary: 'SignUp user' })
  @ApiResponse({ status: 200, type: User })
  @Post('sign-up')
  signUp(@Body() authDto: AuthDto): Promise<User> {
    return this.authService.signUp(authDto);
  }

  @ApiOperation({ summary: 'Update signUp user' })
  @ApiResponse({ status: 200, type: User })
  @Put('sign-up')
  signUpUpdate(@Body() authDto: AuthDto): Promise<User> {
    return this.authService.update(authDto);
  }

  @ApiOperation({ summary: 'SignIn user' })
  @ApiResponse({ status: 200, type: SwaggerTokenTypes })
  @Post('sign-in')
  signIn(@Body() authDto: AuthDto): Promise<TokenTypes> {
    return this.authService.signIn(authDto);
  }

  // @Get()
  // @UseGuards(AuthGuard('google'))
  // async googleAuth(@Req() req) {}

  @ApiOperation({ summary: 'Google redirect' })
  @Get('redirect')
  @UseGuards(AuthGuard('google'))
  googleAuthRedirect(@Req() req, @Res() res) {
    this.authService.googleSignUp(req);
    res.redirect(`${process.env.GOOGLE_AUTH}/${req.user.email}`);
  }

  @ApiOperation({ summary: 'Send email with forgotten password' })
  @ApiResponse({ status: 201 })
  @Post('forgot-password')
  async forgotPassword(@Body() forgotPasswordDto: ForgotPasswordDto) {
    return this.authService.forgotPassword(forgotPasswordDto);
  }

  @ApiOperation({ summary: 'Change user password' })
  @ApiResponse({ status: 200 })
  @Put('change-password')
  async changePassword(@Body() changePasswordDto: ChangePasswordDto) {
    return this.authService.changePassword(changePasswordDto);
  }

  @ApiOperation({ summary: 'Restore user password' })
  @Post('restore-password')
  async restorePassword(@Body() restorePasswordDto: RestorePasswordDto) {
    return this.authService.restorePassword(restorePasswordDto);
  }

  @ApiOperation({ summary: 'Get all users' })
  @ApiResponse({ status: 200, type: [User] })
  @Get('user')
  async getUser() {
    return this.authService.getUser();
  }
}
