import { Controller, Get } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { AppService } from './app.service';

@ApiTags('Default Nest')
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @ApiOperation({ summary: 'Default GET Request' })
  @ApiResponse({ status: 200 })
  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
}
