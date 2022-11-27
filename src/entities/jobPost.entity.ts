import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinTable, ManyToMany, OneToMany, OneToOne } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { CategoryEntity } from './category.entity';
import { JoinColumn } from 'typeorm';
import { SkillsEntity } from './skills.entity';
import { User } from './user.entity';
import { ClientSettingsEntity } from './clientSetttings.entity';

@Entity()
export class JobPostEntity {
  @ApiProperty({ example: 1, description: 'Uniq identificator' })
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({ example: 'Developer', description: 'Job title' })
  @Column({ type: 'varchar', length: 255 })
  jobTitle: string;

  @ApiProperty({ type: CategoryEntity })
  @ManyToOne(() => CategoryEntity, (category) => category.id, { cascade: true })
  jobCategory: CategoryEntity;

  @ApiProperty({ type: [SkillsEntity] })
  @ManyToMany(() => SkillsEntity, { cascade: true })
  @JoinTable()
  jobSkills: SkillsEntity[];

  @ApiProperty({ type: ClientSettingsEntity })
  @OneToOne(() => ClientSettingsEntity, (clientInfo) => clientInfo.userId)
  @JoinColumn()
  clientSetting: ClientSettingsEntity;

  @ApiProperty({ example: 12, description: 'From hour rate' })
  @Column({ type: 'integer' })
  fromHourRate: number;

  @ApiProperty({ example: 23, description: 'TO hour rate' })
  @Column({ type: 'integer' })
  toHourRate: number;

  @ApiProperty({ example: 'short', description: 'Job duration' })
  @Column({ type: 'varchar', length: 255 })
  jobDuration: string;

  @ApiProperty({ example: 'smart', description: 'Job description' })
  @Column({ type: 'varchar', length: 5000 })
  jobDescription: string;

  @ApiProperty({ example: 1, description: 'userId' })
  @Column({ type: 'integer' })
  @JoinColumn()
  @ManyToOne(() => User, (user) => user.id, { cascade: true })
  userId: number;

  @ApiProperty({ example: '2022-01-01-T12:00:00.000Z', description: 'date Time' })
  @Column({
    nullable: false,
    default: () => 'CURRENT_TIMESTAMP',
    type: 'timestamp',
  })
  dateTime: Date;
}
