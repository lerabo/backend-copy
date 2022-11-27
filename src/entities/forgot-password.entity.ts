import { ApiProperty } from '@nestjs/swagger';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { User } from './user.entity';
import { IsString, MaxLength } from 'class-validator';

@Entity()
export class ForgotPassword {
  @ApiProperty({ example: 1, description: 'Uniq identificator' })
  @PrimaryGeneratedColumn({
    name: 'id',
  })
  id: number;

  @ApiProperty({ type: User })
  @ManyToOne(() => User, (user) => user.forgotPassword)
  user: User;

  @ApiProperty({ example: 'samle of link', description: 'Link of forgot password' })
  @Column({ unique: true })
  @IsString()
  @MaxLength(150)
  link: string;
}
