import { CategoryEntity } from 'src/entities/category.entity';
import { SkillsEntity } from 'src/entities/skills.entity';

export class JobPostDto {
  jobTitle: string;
  jobCategory: CategoryEntity;
  jobSkills: SkillsEntity[];
  fromHourRate: number;
  toHourRate: number;
  jobDuration: string;
  jobDescription: string;
  dateTime: Date;
  userId: number;
}
