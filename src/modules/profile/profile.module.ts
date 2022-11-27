import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CategoryEntity } from 'src/entities/category.entity';
import { OfferEntity } from 'src/entities/offer.entity';
import { EducationEntity } from 'src/entities/profile/education.entity';
import { ExperienceEntity } from 'src/entities/profile/experience.entity';
import { ProfileEntity } from 'src/entities/profile/profile.entity';
import { SaveFreelancerEntity } from 'src/entities/profile/favourite.entity';
import { SkillsEntity } from 'src/entities/skills.entity';
import { User } from 'src/entities/user.entity';
import { ProfileController } from './profile.controller';
import { ProfileService } from './profile.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      ProfileEntity,
      CategoryEntity,
      EducationEntity,
      ExperienceEntity,
      SkillsEntity,
      User,
      OfferEntity,
      SaveFreelancerEntity,
    ]),
  ],
  providers: [ProfileService],
  controllers: [ProfileController],
})
export class ProfileModule {}
