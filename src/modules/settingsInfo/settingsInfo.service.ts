import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/entities/user.entity';
import { Repository } from 'typeorm';
import { SettingsInfoDto } from './dto/settingsInfo.dto';

@Injectable()
export class SettingsInfoService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async saveUserSettings(id: number, settingsInfoDto: SettingsInfoDto): Promise<User> {
    const currentUserSettings = await this.userRepository.findOneBy({ id: id });
    if (!currentUserSettings) {
      throw new HttpException(
        {
          status: HttpStatus.NOT_FOUND,
          error: `Not find user with ${id}`,
        },
        HttpStatus.NOT_FOUND,
      );
    }
    currentUserSettings.firstName = settingsInfoDto.firstName;
    currentUserSettings.lastName = settingsInfoDto.lastName;
    currentUserSettings.phone = settingsInfoDto.phone;
    currentUserSettings.userId = settingsInfoDto.userId;
    const profile = await this.userRepository.save(currentUserSettings);
    console.log(profile);
    return profile;
  }

  async getInfoByUser(userId: number) {
    const clientInfoByUser = await this.userRepository
      .createQueryBuilder('userInfo')
      .where('userInfo.userId = :userId', { userId })
      .getOne();

    if (!clientInfoByUser) {
      throw new HttpException(
        {
          status: HttpStatus.BAD_REQUEST,
          error: 'user info not found',
        },
        HttpStatus.BAD_REQUEST,
      );
    }
    return clientInfoByUser;
  }

  async getAllSettings(): Promise<User[]> {
    const allSetting = await this.userRepository.find();
    return allSetting;
  }
}
