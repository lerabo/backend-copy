import { ApiProperty } from '@nestjs/swagger';
import { DeletingStatus, RoomStatus, SendedStatus } from 'src/modules/chat-room/dto/chat-room.types';
import { Entity, PrimaryGeneratedColumn, CreateDateColumn, OneToMany, JoinColumn, ManyToOne, Column } from 'typeorm';
import { JobPostEntity } from './jobPost.entity';
import { Message } from './message.entity';
import { User } from './user.entity';

@Entity()
export class ChatRoom {
  @ApiProperty({ example: 1, description: 'Uniq identificator' })
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({ type: JobPostEntity })
  @ManyToOne(() => JobPostEntity)
  @JoinColumn({ name: 'jobPostId' })
  jobPostId: JobPostEntity;

  @ApiProperty({ type: User })
  @ManyToOne(() => User)
  @JoinColumn({ name: 'clientId' })
  clientId: User;

  @ApiProperty({ type: User })
  @ManyToOne(() => User)
  @JoinColumn({ name: 'freelancerId' })
  freelancerId: User;

  @ApiProperty({ type: [Message] })
  @OneToMany(() => Message, (message) => message.chatRoom)
  message: Message[];

  @ApiProperty({ example: 'none', description: 'Status of active room or not' })
  @Column({
    type: 'enum',
    enum: RoomStatus,
    default: RoomStatus.NONE,
  })
  activeRoom: string;

  @ApiProperty({ example: '2022-01-01-T12:00:00.000Z', description: 'When created' })
  @CreateDateColumn()
  createdAt: Date;

  @ApiProperty({ example: 'none', description: 'Status for deleting chat' })
  @Column({
    type: 'enum',
    enum: DeletingStatus,
    default: DeletingStatus.NONE,
  })
  deletedFor: string;

  @ApiProperty({ example: 'forFreelancer', description: 'Status for sended chat' })
  @Column({
    type: 'enum',
    enum: SendedStatus,
  })
  sendedFor: string;
}
