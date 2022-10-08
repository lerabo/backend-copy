import { Body, Controller, Get, Post, Param, Patch } from '@nestjs/common';
import { ClientSettingsService } from './clientSettings.service';
import { ClientSettingsDto } from './dto/clientSettings.dto';

@Controller('clientInfo')
export class ClientSettingsController {
  constructor(private clientSetttingsService: ClientSettingsService) {}

  @Get(':id')
  getClientInfo(@Param('id') id: number) {
    return this.clientSetttingsService.getClientInfo(Number(id));
  }

  @Get('user/:id')
  getClientInfoByUser(@Param('id') userId: number) {
    return this.clientSetttingsService.getClientInfoByUser(Number(userId));
  }

  @Get()
  getAllClientsInfo() {
    return this.clientSetttingsService.getAllClientsInfo();
  }

  @Post()
  saveClientInfo(@Body() clientSettingsDto: ClientSettingsDto) {
    return this.clientSetttingsService.saveClientInfo(clientSettingsDto);
  }

  @Patch(':id')
  updateClientInfo(@Param('id') id: number, @Body() updateClientSettingsDto: ClientSettingsDto) {
    return this.clientSetttingsService.updateClientInfo(id, updateClientSettingsDto);
  }
}
