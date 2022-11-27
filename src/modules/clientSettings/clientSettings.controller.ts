import { Body, Controller, Get, Post, Param, Patch } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { ClientSettingsEntity } from 'src/entities/clientSetttings.entity';
import { ClientSettingsService } from './clientSettings.service';
import { ClientSettingsDto } from './dto/clientSettings.dto';

@ApiTags('Client Info')
@Controller('clientInfo')
export class ClientSettingsController {
  constructor(private clientSetttingsService: ClientSettingsService) {}

  @ApiOperation({ summary: 'Get client info by Id' })
  @ApiResponse({ status: 200, type: ClientSettingsEntity })
  @Get(':id')
  getClientInfo(@Param('id') id: number) {
    return this.clientSetttingsService.getClientInfo(Number(id));
  }

  @ApiOperation({ summary: 'Get client info by user by Id' })
  @ApiResponse({ status: 200, type: ClientSettingsEntity })
  @Get('user/:id')
  getClientInfoByUser(@Param('id') userId: number) {
    return this.clientSetttingsService.getClientInfoByUser(Number(userId));
  }

  @ApiOperation({ summary: 'Get all clients info' })
  @ApiResponse({ status: 200, type: [ClientSettingsEntity] })
  @Get()
  getAllClientsInfo() {
    return this.clientSetttingsService.getAllClientsInfo();
  }

  @ApiOperation({ summary: 'Create client info' })
  @ApiResponse({ status: 200, type: ClientSettingsEntity })
  @Post()
  saveClientInfo(@Body() clientSettingsDto: ClientSettingsDto) {
    return this.clientSetttingsService.saveClientInfo(clientSettingsDto);
  }

  @ApiOperation({ summary: 'Update client info by Id' })
  @ApiResponse({ status: 200, type: ClientSettingsEntity })
  @Patch(':id')
  updateClientInfo(@Param('id') id: number, @Body() updateClientSettingsDto: ClientSettingsDto) {
    return this.clientSetttingsService.updateClientInfo(id, updateClientSettingsDto);
  }
}
