import { Status } from 'src/modules/offer/dto/offer.types';
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { JobPostEntity } from './jobPost.entity';
import { User } from './user.entity';

@Entity('offer')
export class OfferEntity {
  @ApiProperty({ example: 1, description: 'Uniq identificator' })
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({ example: 10, description: 'Offer price' })
  @Column({ type: 'integer' })
  price: number;

  @ApiProperty({ enum: Status, description: 'Offer status' })
  @Column({
    type: 'enum',
    enum: Status,
    default: Status.PENDING,
  })
  status: Status;

  @ApiProperty({ example: 'Offer by Alex', description: 'Offer name' })
  @Column({ type: 'varchar' })
  name: string;

  @ApiProperty({ example: '2022-01-01-T12:00:00.000Z', description: 'Offer start date' })
  @Column({ type: 'datetime' })
  startDate: Date;

  @ApiProperty({ example: '2022-01-01-T12:00:00.000Z', description: 'Offer end date' })
  @Column({ type: 'datetime' })
  endDate: Date;

  @Column({ type: 'integer' })
  @ManyToOne(() => JobPostEntity)
  @JoinColumn({ name: 'jobPostId' })
  jobPostId: JobPostEntity;

  @Column({ type: 'integer' })
  @ManyToOne(() => User)
  @JoinColumn({ name: 'freelancerId' })
  freelancerId: User;

  @Column({ type: 'integer' })
  @ManyToOne(() => User)
  @JoinColumn({ name: 'clientId' })
  clientId: User;
}
