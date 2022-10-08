import { Column, Entity, PrimaryGeneratedColumn, OneToOne } from 'typeorm';
import { JobPostEntity } from './jobPost.entity';
import { User } from './user.entity';

@Entity('propasal')
export class ProposalPostEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'integer' })
  @OneToOne(() => JobPostEntity, (jobPost) => jobPost.id, { cascade: true })
  jobPost: number;

  @Column({ type: 'integer' })
  @OneToOne(() => User, (user) => user.id, { cascade: true })
  userId: number;

  @Column({ type: 'integer' })
  price: number;

  @Column({ type: 'varchar', length: 5000 })
  message: string;
}
