import { ApiProperty } from '@nestjs/swagger';
import { Column, Entity, PrimaryGeneratedColumn, OneToOne } from 'typeorm';
import { JobPostEntity } from './jobPost.entity';
import { User } from './user.entity';

@Entity('propasal')
export class ProposalPostEntity {
  @ApiProperty({ example: 1, description: 'Uniq identificator' })
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({ example: 1, description: 'jobPost' })
  @Column({ type: 'integer' })
  @OneToOne(() => JobPostEntity, (jobPost) => jobPost.id, { cascade: true })
  jobPost: number;

  @ApiProperty({ example: 1, description: 'userId' })
  @Column({ type: 'integer' })
  @OneToOne(() => User, (user) => user.id, { cascade: true })
  userId: number;

  @ApiProperty({ example: 15, description: 'Job post price' })
  @Column({ type: 'integer' })
  price: number;

  @ApiProperty({ example: 1, description: 'clientId' })
  @Column({ type: 'integer', default: 0 })
  clientId: number;

  @ApiProperty({ example: 'This is message for job post', description: 'Message for job post' })
  @Column({ type: 'varchar', length: 5000 })
  message: string;
}
