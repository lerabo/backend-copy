import { Body, Controller, Get, Param, Post, Patch } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { ChatRoom } from 'src/entities/chat-room.entity';
import { ChatRoomService } from './chat-room.service';
import { ChatRoomDto } from './dto/chat-room.dto';

@ApiTags('Chat')
@Controller('chat-room')
export class ChatRoomController {
  constructor(private chatRoomService: ChatRoomService) {}

  @ApiOperation({ summary: 'Create chat room' })
  @ApiResponse({ status: 200, type: ChatRoom })
  @Post()
  createRoom(@Body() data: ChatRoomDto): Promise<ChatRoom> {
    return this.chatRoomService.createRoom(data);
  }

  @ApiOperation({ summary: 'Update chat room bu Id' })
  @Patch(':id')
  updateRoom(@Param('id') id: number, @Body() data: Partial<ChatRoomDto>): Promise<ChatRoom> {
    return this.chatRoomService.updateRoom(Number(id), data);
  }

  @ApiOperation({ summary: 'Update chat room by deleting status' })
  @Patch('delete/:id')
  updateDeletingStatus(@Param('id') id: number, @Body() data: Partial<ChatRoomDto>): Promise<ChatRoom> {
    return this.chatRoomService.updateDeletingStatus(Number(id), data);
  }

  @ApiOperation({ summary: 'Get all chat rooms' })
  @ApiResponse({ status: 200, type: [ChatRoom] })
  @Get()
  getAll() {
    return this.chatRoomService.getAll();
  }

  @ApiOperation({ summary: 'Get chat room by Id' })
  @ApiResponse({ status: 200, type: [ChatRoom] })
  @Get(':id')
  getChatRoomsByUserId(@Param('id') id: number) {
    return this.chatRoomService.getChatRoomsByUserId(Number(id));
  }

  @ApiOperation({ summary: 'Get chat room by jobPost Id' })
  @ApiResponse({ status: 200, type: ChatRoom })
  @Get(':clientId/:freelancerId/:jobPostId')
  getChatRoomsByTwoUserId(
    @Param('clientId') clientId: number,
    @Param('freelancerId') freelancerId: number,
    @Param('jobPostId') jobPostId: number,
  ) {
    return this.chatRoomService.getChatRoomsByTwoUserId(Number(clientId), Number(freelancerId), Number(jobPostId));
  }
}
