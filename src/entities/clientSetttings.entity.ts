import { Column, Entity, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from 'typeorm';
import { User } from './user.entity';

@Entity()
export class ClientSettingsEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 255 })
  name: string;

  @Column({ type: 'varchar', length: 255 })
  country: string;

  @Column({ nullable: true })
  website: string;

  @Column({ nullable: true })
  industry: string;

  @Column({ nullable: true })
  quantity: string;

  @Column({ nullable: true })
  description: string;

  @Column({ type: 'integer' })
  @JoinColumn()
  @ManyToOne(() => User, (user) => user.userId, { cascade: true })
  userId: number;
}
