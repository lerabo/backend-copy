import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CategoryEntity } from 'src/entities/category.entity';
import { JobPostEntity } from 'src/entities/jobPost.entity';
import { OfferEntity } from 'src/entities/offer.entity';
import { SkillsEntity } from 'src/entities/skills.entity';
import { JobPostController } from './jobPost.controller';
import { JobPostService } from './jobPost.service';

@Module({
  imports: [TypeOrmModule.forFeature([JobPostEntity, CategoryEntity, SkillsEntity, OfferEntity])],
  providers: [JobPostService],
  controllers: [JobPostController],
})
export class JobPostModule {}
