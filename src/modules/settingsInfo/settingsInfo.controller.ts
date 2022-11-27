import { Body, Controller, Post, Param, Get } from '@nestjs/common';
import { ApiOperation, ApiTags, ApiResponse } from '@nestjs/swagger';
import { User } from 'src/entities/user.entity';
import { SettingsInfoDto } from './dto/settingsInfo.dto';
import { SettingsInfoService } from './settingsInfo.service';

@ApiTags('Contact info')
@Controller('contact-info')
export class SettingsInfoController {
  constructor(private readonly settingsInfoService: SettingsInfoService) {}

  @ApiOperation({ summary: 'Create contact info by id' })
  @ApiResponse({ status: 200, type: User })
  @Post(':id')
  create(
    @Param('id') id: number,
    @Body()
    settingsInfoDto: SettingsInfoDto,
  ): Promise<User> {
    return this.settingsInfoService.saveUserSettings(Number(id), settingsInfoDto);
  }

  @ApiOperation({ summary: 'Get contact info' })
  @ApiResponse({ status: 200, type: [User] })
  @Get('setting')
  getAllSettings(): Promise<User[]> {
    return this.settingsInfoService.getAllSettings();
  }
}
