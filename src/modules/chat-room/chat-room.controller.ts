import { Body, Controller, Get, Post, Res } from '@nestjs/common';
import { ChatRoom } from 'src/entities/chat-room.entity';
import { ChatRoomService } from './chat-room.service';
import { ChatRoomDto } from './dto/chat-room.dto';

@Controller('chat-room')
export class ChatRoomController {
  constructor(private chatRoomService: ChatRoomService) {}

  @Post()
  create(@Body() data: ChatRoomDto): Promise<ChatRoom> {
    return this.chatRoomService.create(data);
  }

  @Get()
  getAll() {
    return this.chatRoomService.getAll();
  }
}
