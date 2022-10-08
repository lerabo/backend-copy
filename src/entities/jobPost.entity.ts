import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinTable, ManyToMany } from 'typeorm';
import { CategoryEntity } from './category.entity';
import { SkillsEntity } from './skills.entity';
import { User } from './user.entity';

@Entity()
export class JobPostEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 255 })
  jobTitle: string;

  @ManyToOne(() => CategoryEntity, (category) => category.id, { cascade: true })
  jobCategory: CategoryEntity;

  @ManyToMany(() => SkillsEntity, { cascade: true })
  @JoinTable()
  jobSkills: SkillsEntity[];

  @Column({ type: 'integer' })
  fromHourRate: number;

  @Column({ type: 'integer' })
  toHourRate: number;

  @Column({ type: 'varchar', length: 255 })
  jobDuration: string;

  @Column({ type: 'varchar', length: 5000 })
  jobDescription: string;

  @Column({ type: 'integer' })
  @ManyToOne(() => User, (user) => user.id, { cascade: true })
  userId: number;

  @Column({
    nullable: false,
    default: () => 'CURRENT_TIMESTAMP',
    type: 'timestamp',
  })
  dateTime: Date;
}
