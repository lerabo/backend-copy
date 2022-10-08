import { Body, Controller, Post, Param, Get } from '@nestjs/common';
import { SettingsInfoDto } from './dto/settingsInfo.dto';
import { SettingsInfoService } from './settingsInfo.service';

@Controller('contact-info')
export class SettingsInfoController {
  constructor(private readonly settingsInfoService: SettingsInfoService) {}

  @Post(':id')
  create(
    @Param('id') id: number,
    @Body()
    settingsInfoDto: SettingsInfoDto,
  ) {
    return this.settingsInfoService.saveUserSettings(Number(id), settingsInfoDto);
  }

  @Get('setting')
  getAllSkills() {
    return this.settingsInfoService.getAllSettings();
  }
}
