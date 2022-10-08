import { Entity, PrimaryGeneratedColumn, CreateDateColumn, OneToMany, JoinColumn, ManyToOne } from 'typeorm';
import { JobPostEntity } from './jobPost.entity';
import { Message } from './message.entity';
import { User } from './user.entity';

@Entity()
export class ChatRoom {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => JobPostEntity)
  @JoinColumn({ name: 'jobPostId' })
  jobPost: JobPostEntity;

  @ManyToOne(() => User)
  @JoinColumn({ name: 'userId' })
  freelancer: User;

  @OneToMany(() => Message, (message) => message.chatRoom)
  message: Message[];

  @CreateDateColumn()
  createdAt: Date;
}
