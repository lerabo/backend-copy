import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { ProfileEntity } from './profile.entity';

@Entity('favourite')
export class SaveFreelancerEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'boolean', default: false })
  saved: boolean;

  @Column({ type: 'integer', default: 0, unique: false })
  clientId: number;

  @ManyToOne(() => ProfileEntity, (profile) => profile.profile)
  @Column({ type: 'integer', unique: false })
  freelancerId: number;
}
