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
        senderId: { id: data.senderId },
        receiverId: { id: data.receiverId },
        activeRoom: data.activeRoom,
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
      .leftJoinAndSelect('chat_room.senderId', 'sender', 'sender.id=senderId')
      .leftJoinAndSelect('chat_room.receiverId', 'receiver', 'receiver.id=receiverId')
      .leftJoinAndSelect('chat_room.jobPostId', 'job_post_entity')
      .leftJoinAndSelect('chat_room.message', 'message')
      .orderBy('chat_room.createdAt', 'DESC')
      .getMany();
    return chatRooms;
  }

  async getChatRoomsByUserId(id: number): Promise<ChatRoom[]> {
    const chatInfo = await this.chatRoomRepository
      .createQueryBuilder('chat_room')
      .leftJoinAndSelect('chat_room.senderId', 'sender', 'sender.id=senderId')
      .leftJoinAndSelect('chat_room.receiverId', 'receiver', 'receiver.id=receiverId')
      .leftJoinAndSelect('receiver.clientSetting', 'clientInfo.id=receiver.id')
      .leftJoinAndSelect('receiver.profileSetting', 'profile.id=receiver.id')
      .leftJoinAndSelect('sender.clientSetting', 'clientInfo.id=sender.id')
      .leftJoinAndSelect('sender.profileSetting', 'profile.id=sender.id')
      .leftJoinAndSelect('chat_room.jobPostId', 'job_post_entity')
      .leftJoinAndSelect('chat_room.message', 'message')
      .where('chat_room.receiverId.id LIKE :id', { id })
      .orWhere('chat_room.senderId.id LIKE :id', { id })
      .orderBy('message.created_at', 'DESC')
      .getMany();
    return chatInfo;
  }

  async getChatRoomsByTwoUserId(senderId: number, receiverId: number, jobPostId: number): Promise<ChatRoom> {
    const chatInfo = await this.chatRoomRepository
      .createQueryBuilder('chat_room')
      .leftJoinAndSelect('chat_room.senderId', 'sender', 'sender.id=senderId')
      .leftJoinAndSelect('chat_room.receiverId', 'receiver', 'receiver.id=receiverId')
      .leftJoinAndSelect('receiver.clientSetting', 'clientInfo.id=receiver.id')
      .leftJoinAndSelect('receiver.profileSetting', 'profile.id=receiver.id')
      .leftJoinAndSelect('sender.clientSetting', 'clientInfo.id=sender.id')
      .leftJoinAndSelect('sender.profileSetting', 'profile.id=sender.id')
      .leftJoinAndSelect('chat_room.jobPostId', 'job_post_entity')
      .leftJoinAndSelect('chat_room.message', 'message')
      .leftJoinAndSelect('message.user', 'user')
      .where('chat_room.senderId.id LIKE :senderId', { senderId })
      .andHaving('chat_room.receiverId.id LIKE :receiverId', { receiverId })
      .andHaving('chat_room.jobPostId.id LIKE :jobPostId', { jobPostId })
      .getOne();
    return chatInfo;
  }
}
