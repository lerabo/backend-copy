import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { MessageDto } from './dto/message.dto';
import { Message } from 'src/entities/message.entity';

@Injectable()
export class MessageService {
  constructor(
    @InjectRepository(Message)
    private messageRepository: Repository<Message>,
  ) {}

  async createMessage(data: MessageDto): Promise<Message> {
    try {
      const message = await this.messageRepository.save({
        text: data.text,
        chatRoom: { id: data.chatRoomId },
        user: { id: data.userId },
        jobLink: data.jobLink,
      });
      return message;
    } catch (error) {
      console.log(error);
    }
  }

  async getAllByRoomId(id: number): Promise<Message[]> {
    const messages = await this.messageRepository
      .createQueryBuilder('message')
      .leftJoin('message.chatRoom', 'chat_room', 'message.chatRoomId = chat_room.Id')
      .leftJoinAndSelect('message.user', 'user')
      .where(`chat_room.id = ${id}`)
      .orderBy(`message.created_at`, 'ASC')
      .getMany();
    return messages;
  }
}
