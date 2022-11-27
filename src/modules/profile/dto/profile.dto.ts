import { ApiProperty } from '@nestjs/swagger';
import { CategoryEntity } from 'src/entities/category.entity';
import { OfferEntity } from 'src/entities/offer.entity';
import { EducationEntity } from 'src/entities/profile/education.entity';
import { ExperienceEntity } from 'src/entities/profile/experience.entity';
import { SkillsEntity } from 'src/entities/skills.entity';

export class ProfileDto {
  @ApiProperty({ example: 'dsfgsdfg', description: 'Profile photo' })
  photo: string;

  @ApiProperty({ example: 1, description: 'userId' })
  userId: number;

  saved: boolean;
  clientId: number;

  @ApiProperty({ example: 'head', description: 'Profile position' })
  position: string;

  @ApiProperty({ example: 123, description: 'Profile price' })
  price: number;

  @ApiProperty({ example: 'Pre_intermediate', description: 'Profile english level' })
  englishLevel: string;

  @ApiProperty({ example: 'long', description: 'Profile description' })
  description: string;

  category: CategoryEntity;
  education: EducationEntity[];
  experience: ExperienceEntity[];
  skills: SkillsEntity[];
  offer: OfferEntity[];
}
