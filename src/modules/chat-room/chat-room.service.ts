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
  async createRoom(data: ChatRoomDto): Promise<ChatRoom> {
    try {
      return await this.chatRoomRepository.save({
        jobPostId: { id: data.jobPostId },
        clientId: { id: data.clientId },
        freelancerId: { id: data.freelancerId },
        activeRoom: data.activeRoom,
        sendedFor: data.sendedFor,
      });
    } catch (error) {
      console.log(error);
    }
  }

  async updateRoom(id: number, data: Partial<ChatRoomDto>): Promise<ChatRoom> {
    try {
      const room = await this.chatRoomRepository.findOneBy({ id });
      room.activeRoom = data.activeRoom;
      return await this.chatRoomRepository.save(room);
    } catch (error) {
      console.log(error);
    }
  }

  async updateDeletingStatus(id: number, data: Partial<ChatRoomDto>): Promise<ChatRoom> {
    try {
      const room = await this.chatRoomRepository.findOneBy({ id });
      room.deletedFor = data.deletedFor;
      return await this.chatRoomRepository.save(room);
    } catch (error) {
      console.log(error);
    }
  }

  async getAll(): Promise<ChatRoom[]> {
    const chatRooms = await this.chatRoomRepository
      .createQueryBuilder('chat_room')
      .leftJoinAndSelect('chat_room.clientId', 'client', 'client.id=clientId')
      .leftJoinAndSelect('chat_room.freelancerId', 'freelancer', 'freelancer.id=freelancerId')
      .leftJoinAndSelect('chat_room.jobPostId', 'job_post_entity')
      .leftJoinAndSelect('chat_room.message', 'message')
      .orderBy('chat_room.createdAt', 'DESC')
      .getMany();
    return chatRooms;
  }

  async getChatRoomsByUserId(id: number): Promise<ChatRoom[]> {
    const chatInfo = await this.chatRoomRepository
      .createQueryBuilder('chat_room')
      .leftJoinAndSelect('chat_room.clientId', 'client', 'client.id=clientId')
      .leftJoinAndSelect('chat_room.freelancerId', 'freelancer', 'freelancer.id=freelancerId')
      .leftJoinAndSelect('freelancer.profileSetting', 'profile.id=freelancer.id')
      .leftJoinAndSelect('client.clientSetting', 'clientInfo.id=client.id')
      .leftJoinAndSelect('chat_room.jobPostId', 'job_post_entity')
      .leftJoinAndSelect('chat_room.message', 'message')
      .where('chat_room.freelancerId.id LIKE :id', { id })
      .orWhere('chat_room.clientId.id LIKE :id', { id })
      .orderBy('message.created_at', 'DESC')
      .getMany();
    return chatInfo;
  }

  async getChatRoomsByTwoUserId(clientId: number, freelancerId: number, jobPostId: number): Promise<ChatRoom> {
    const chatInfo = await this.chatRoomRepository
      .createQueryBuilder('chat_room')
      .leftJoinAndSelect('chat_room.clientId', 'client', 'client.id=clientId')
      .leftJoinAndSelect('chat_room.freelancerId', 'freelancer', 'freelancer.id=freelancerId')
      .leftJoinAndSelect('freelancer.profileSetting', 'profile.id=freelancer.id')
      .leftJoinAndSelect('client.clientSetting', 'clientInfo.id=client.id')
      .leftJoinAndSelect('chat_room.jobPostId', 'job_post_entity')
      .leftJoinAndSelect('chat_room.message', 'message')
      .leftJoinAndSelect('message.user', 'user')
      .where('chat_room.clientId.id LIKE :clientId', { clientId })
      .andHaving('chat_room.freelancerId.id LIKE :freelancerId', { freelancerId })
      .andHaving('chat_room.jobPostId.id LIKE :jobPostId', { jobPostId })
      .getOne();
    return chatInfo;
  }
}
