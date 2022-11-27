import { Body, Controller, Get, Param, Post, Res } from '@nestjs/common';
import { ChatRoom } from 'src/entities/chat-room.entity';
import { MessageService } from './message.service';
import { MessageDto } from './dto/message.dto';
import { Message } from 'src/entities/message.entity';
import { ApiOperation, ApiTags, ApiResponse } from '@nestjs/swagger';

@ApiTags('Message')
@Controller('message')
export class MessageController {
  constructor(private messageService: MessageService) {}

  @ApiOperation({ summary: 'Create message' })
  @ApiResponse({ status: 200, type: Message })
  @Post()
  create(@Body() data: MessageDto): Promise<Message> {
    return this.messageService.createMessage(data);
  }

  @ApiOperation({ summary: 'Get message by Id' })
  @ApiResponse({ status: 200, type: [Message] })
  @Get(':id')
  getAll(@Param('id') id: number) {
    return this.messageService.getAllByRoomId(Number(id));
  }
}
