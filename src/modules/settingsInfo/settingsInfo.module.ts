import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProfileEntity } from 'src/entities/profile/profile.entity';
import { User } from 'src/entities/user.entity';
import { SettingsInfoController } from './settingsInfo.controller';
import { SettingsInfoService } from './settingsInfo.service';

@Module({
  imports: [TypeOrmModule.forFeature([User, ProfileEntity])],
  providers: [SettingsInfoService],
  controllers: [SettingsInfoController],
})
export class SettingsInfoModule {}
