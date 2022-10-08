import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JobPostEntity } from 'src/entities/jobPost.entity';
import { ProposalPostEntity } from 'src/entities/propasal.entity';
import { ProposalPostController } from './proposal.controller';
import { ProposalPostService } from './proposal.service';

@Module({
  imports: [TypeOrmModule.forFeature([JobPostEntity, ProposalPostEntity])],
  providers: [ProposalPostService],
  controllers: [ProposalPostController],
})
export class ProposalPostModule {}
