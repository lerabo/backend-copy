import { Entity, Column, PrimaryGeneratedColumn, OneToMany, OneToOne, ManyToOne, JoinColumn } from 'typeorm';
import { ForgotPassword } from './forgot-password.entity';
import { ProfileEntity } from './profile/profile.entity';
import { JobPostEntity } from './jobPost.entity';
import { IsOptional } from 'class-validator';

@Entity({ name: 'user', schema: 'public' })
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  email: string;

  @Column({ default: 'default' })
  password: string;

  @Column({ nullable: true })
  googleId: string;

  @Column({ type: 'varchar', default: 'default' })
  firstName: string;

  @Column({ type: 'varchar', default: 'default' })
  lastName: string;

  @Column({ type: 'varchar', default: 'default' })
  phone: string;

  @Column({ type: 'integer', nullable: true })
  @IsOptional()
  @JoinColumn()
  @ManyToOne(() => ProfileEntity, (profile) => profile.userId)
  userId: number;

  @Column({
    type: 'enum',
    enum: ['client', 'freelancer'],
    nullable: true,
  })
  role: string;

  @OneToMany(() => ForgotPassword, (forgotPassword: ForgotPassword) => forgotPassword.user)
  forgotPassword: ForgotPassword[];

  @OneToMany(() => JobPostEntity, (jobPost: JobPostEntity) => jobPost.userId)
  jobPost: JobPostEntity;
}
