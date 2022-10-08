import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { IsString } from 'class-validator';
import { ChatRoom } from './chat-room.entity';
import { User } from './user.entity';

@Entity()
export class Message {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  @IsString()
  text: string;

  @ManyToOne(() => User)
  @JoinColumn({ name: 'senderId' })
  user: User;

  @ManyToOne(() => ChatRoom, (chatRoom) => chatRoom.message, { cascade: true })
  @JoinColumn()
  chatRoom: ChatRoom;

  @CreateDateColumn()
  created_at: Date;
}
