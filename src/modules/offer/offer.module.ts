import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JobPostEntity } from 'src/entities/jobPost.entity';
import { OfferEntity } from 'src/entities/offer.entity';
import { OfferPostController } from './offer.controller';
import { OfferPostService } from './offer.service';

@Module({
  imports: [TypeOrmModule.forFeature([JobPostEntity, OfferEntity])],
  providers: [OfferPostService],
  controllers: [OfferPostController],
})
export class OfferPostModule {}
