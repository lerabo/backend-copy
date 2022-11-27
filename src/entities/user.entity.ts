import { Entity, Column, PrimaryGeneratedColumn, OneToMany, OneToOne, ManyToOne, JoinColumn, JoinTable } from 'typeorm';
import { ForgotPassword } from './forgot-password.entity';
import { ProfileEntity } from './profile/profile.entity';
import { JobPostEntity } from './jobPost.entity';
import { IsOptional } from 'class-validator';
import { ClientSettingsEntity } from './clientSetttings.entity';
import { OfferEntity } from './offer.entity';
import { ApiProperty } from '@nestjs/swagger';

@Entity({ name: 'user', schema: 'public' })
export class User {
  @ApiProperty({ example: 1, description: 'Uniq identificator' })
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({ example: 'example@gmail.com', description: 'User email' })
  @Column({ unique: true })
  email: string;

  @ApiProperty({ example: '12345678', description: 'User password' })
  @Column({ default: 'default' })
  password: string;

  @ApiProperty({ example: '435hgfrh56', description: 'User googleId' })
  @Column({ nullable: true })
  googleId: string;

  @ApiProperty({ example: 'Alex', description: 'User first name' })
  @Column({ type: 'varchar', default: 'default' })
  firstName: string;

  @ApiProperty({ example: 'Smith', description: 'User last name' })
  @Column({ type: 'varchar', default: 'default' })
  lastName: string;

  @ApiProperty({ example: '+380123456789', description: 'User phone' })
  @Column({ type: 'varchar', default: 'default' })
  phone: string;

  @ApiProperty({ example: 1, description: 'User id for profile' })
  @Column({ type: 'integer', nullable: true })
  @IsOptional()
  @JoinColumn()
  @ManyToOne(() => ProfileEntity, (profile) => profile.userId)
  userId: number;

  @ApiProperty({ type: ClientSettingsEntity })
  @OneToOne(() => ClientSettingsEntity, (clientInfo) => clientInfo.userId)
  clientSetting: ClientSettingsEntity;

  @ApiProperty({ type: ProfileEntity })
  @OneToOne(() => ProfileEntity, (profile) => profile.userId)
  profileSetting: ProfileEntity;

  @ApiProperty({ type: [OfferEntity] })
  @OneToMany(() => OfferEntity, (offer) => offer.freelancerId)
  @JoinColumn()
  contract: OfferEntity[];

  @ApiProperty({ example: 'freelancer', description: 'User role' })
  @Column({
    type: 'enum',
    enum: ['client', 'freelancer'],
    nullable: true,
  })
  role: string;

  @OneToMany(() => ForgotPassword, (forgotPassword: ForgotPassword) => forgotPassword.user)
  forgotPassword: ForgotPassword[];

  @ApiProperty({ type: JobPostEntity })
  @OneToMany(() => JobPostEntity, (jobPost: JobPostEntity) => jobPost.userId)
  jobPost: JobPostEntity;
}
