import { ApiProperty } from '@nestjs/swagger';
import { CategoryEntity } from 'src/entities/category.entity';
import { SkillsEntity } from 'src/entities/skills.entity';

export class JobPostDto {
  @ApiProperty({ example: 'Developer', description: 'Job title' })
  jobTitle: string;

  @ApiProperty({ type: CategoryEntity })
  jobCategory: CategoryEntity;

  @ApiProperty({ type: [SkillsEntity] })
  jobSkills: SkillsEntity[];

  @ApiProperty({ example: 12, description: 'From hour rate' })
  fromHourRate: number;

  @ApiProperty({ example: 23, description: 'TO hour rate' })
  toHourRate: number;

  @ApiProperty({ example: 'short', description: 'Job duration' })
  jobDuration: string;

  @ApiProperty({ example: 'smart', description: 'Job description' })
  jobDescription: string;

  @ApiProperty({ example: '2022-01-01-T12:00:00.000Z', description: 'date Time' })
  dateTime: Date;

  @ApiProperty({ example: 1, description: 'userId' })
  userId: number;
}
