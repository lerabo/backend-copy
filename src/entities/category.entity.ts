import { ApiProperty } from '@nestjs/swagger';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

import { ProfileEntity } from './profile/profile.entity';

@Entity('category')
export class CategoryEntity {
  @ApiProperty({ example: 1, description: 'Uniq identificator' })
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({ example: 'IT', description: 'Type of category' })
  @Column({ type: 'varchar', length: 255 })
  name: string;

  @ApiProperty({ type: [ProfileEntity] })
  @OneToMany(() => ProfileEntity, (profile) => profile.id)
  profile: ProfileEntity[];
}
