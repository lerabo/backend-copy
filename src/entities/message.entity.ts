import { ApiProperty } from '@nestjs/swagger';
import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { IsString } from 'class-validator';
import { ChatRoom } from './chat-room.entity';
import { User } from './user.entity';

@Entity()
export class Message {
  @ApiProperty({ example: 1, description: 'Uniq identificator' })
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({ example: 'hello', description: 'sample message text' })
  @Column()
  @IsString()
  text: string;

  @ApiProperty({ type: User })
  @ManyToOne(() => User)
  @JoinColumn({ name: 'clientId' })
  user: User;

  @ApiProperty({ type: ChatRoom })
  @ManyToOne(() => ChatRoom, (chatRoom) => chatRoom.message, { cascade: true })
  @JoinColumn()
  chatRoom: ChatRoom;

  @ApiProperty({ example: '2022-01-01-T12:00:00.000Z', description: 'When created' })
  @CreateDateColumn()
  created_at: Date;

  @ApiProperty({ example: 'sample link', description: 'link to job' })
  @Column({ nullable: true })
  jobLink: string;
}
