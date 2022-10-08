import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ChatRoom } from 'src/entities/chat-room.entity';
import { ChatRoomDto } from './dto/chat-room.dto';

@Injectable()
export class ChatRoomService {
  constructor(
    @InjectRepository(ChatRoom)
    private chatRoomRepository: Repository<ChatRoom>,
  ) {}

  async create(data: ChatRoomDto): Promise<ChatRoom> {
    return await this.chatRoomRepository.save({
      jobPost: { id: data.jobPostId },
      senderId: { id: data.senderId },
    });
  }

  async getAll(): Promise<ChatRoom[]> {
    return await this.chatRoomRepository.find();
  }
}
