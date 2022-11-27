import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  OneToMany,
  ManyToOne,
  ManyToMany,
  JoinTable,
  JoinColumn,
  OneToOne,
} from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { CategoryEntity } from '../category.entity';
import { EducationEntity } from './education.entity';
import { ExperienceEntity } from './experience.entity';
import { SkillsEntity } from '../skills.entity';
import { User } from '../user.entity';
import { SaveFreelancerEntity } from './favourite.entity';
import { ChatRoom } from '../chat-room.entity';
import { OfferEntity } from '../offer.entity';

@Entity('profile')
export class ProfileEntity {
  @ApiProperty({ example: 1, description: 'Uniq identificator' })
  @PrimaryGeneratedColumn()
  id: number;

  @OneToMany(() => SaveFreelancerEntity, (favourite) => favourite.freelancerId)
  @JoinColumn()
  profile: SaveFreelancerEntity[];

  @ApiProperty({ example: 'dsfgsdfg', description: 'Profile photo' })
  @Column({ type: 'longtext' })
  photo: string;

  @ApiProperty({ example: 'head', description: 'Profile position' })
  @Column({ type: 'varchar', length: 255 })
  position: string;

  @ApiProperty({ example: 123, description: 'Profile price' })
  @Column({ type: 'integer' })
  price: number;

  @ApiProperty({ example: 'Pre_intermediate', description: 'Profile english level' })
  @Column({
    type: 'enum',
    enum: ['Pre_intermediate', 'Intermediate', 'Upper_intermediate'],
  })
  englishLevel: string;

  @ApiProperty({ example: 'long', description: 'Profile description' })
  @Column({ type: 'varchar', length: 1000 })
  description: string;

  @ManyToOne(() => CategoryEntity, (category) => category.id, { cascade: true })
  category: CategoryEntity;

  @ManyToMany(() => SkillsEntity, { cascade: true })
  @JoinTable()
  skills: SkillsEntity[];

  @OneToMany(() => EducationEntity, (education) => education.profile, { cascade: true })
  education: EducationEntity[];

  @OneToMany(() => ExperienceEntity, (experience) => experience.profile, { cascade: true })
  experience: ExperienceEntity[];

  @ApiProperty({ example: 1, description: 'userId' })
  @Column({ type: 'integer' })
  @JoinColumn()
  @ManyToOne(() => User, (user) => user.id)
  userId: number;
}
