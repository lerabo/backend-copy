import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ClientSettingsEntity } from 'src/entities/clientSetttings.entity';
import { ClientSettingsController } from './clientSettings.controller';
import { ClientSettingsService } from './clientSettings.service';

@Module({
  imports: [TypeOrmModule.forFeature([ClientSettingsEntity])],
  providers: [ClientSettingsService],
  controllers: [ClientSettingsController],
})
export class ClientSettingsModule {}
