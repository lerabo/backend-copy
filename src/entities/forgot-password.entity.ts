import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { User } from './user.entity';
import { IsString, MaxLength } from 'class-validator';

@Entity()
export class ForgotPassword {
  @PrimaryGeneratedColumn({
    name: 'id',
  })
  id: number;

  @ManyToOne(() => User, (user) => user.forgotPassword)
  user: User;

  @Column({ unique: true })
  @IsString()
  @MaxLength(150)
  link: string;
}
