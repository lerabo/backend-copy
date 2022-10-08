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

  async saveUserSettings(id: number, settingsInfoDto: SettingsInfoDto) {
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
    currentUserSettings.userId = id;
    const profile = await this.userRepository.save(currentUserSettings);
    console.log(profile);
    return profile;
  }

  async getAllSettings(): Promise<User[]> {
    const allSetting = await this.userRepository.find();
    return allSetting;
  }
}
