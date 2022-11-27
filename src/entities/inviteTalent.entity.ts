import { ApiProperty } from '@nestjs/swagger';
import { ProfileEntity } from 'src/entities/profile/profile.entity';
import { Column, Entity, OneToMany, OneToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class InviteTalentEntity {
  @ApiProperty({ example: 1, description: 'Uniq identificator' })
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({ example: 'Hello', description: 'Invite talent message' })
  @Column({ nullable: false, type: 'varchar', length: 255 })
  message: string;

  @ApiProperty({ example: 1, description: 'clientId' })
  @Column({ nullable: false, type: 'integer' })
  clientId: number;

  @ApiProperty({ example: 1, description: 'freelancerId' })
  @Column({ nullable: false, type: 'integer' })
  @OneToOne(() => ProfileEntity, (profile) => profile.userId)
  freelancerId: number;

  @ApiProperty({ example: 1, description: 'profileId' })
  @Column({ nullable: false, type: 'integer' })
  @OneToOne(() => ProfileEntity, (profile) => profile.id)
  profileId: number;

  @ApiProperty({ example: 1, description: 'jobPostId' })
  @Column({ nullable: false, type: 'integer' })
  jobPostId: number;

  @ApiProperty({ example: 'Sample title', description: 'job title ' })
  @Column({ nullable: false, type: 'varchar', length: 255 })
  jobTitle: string;
}
