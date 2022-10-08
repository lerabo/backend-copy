import { Body, Controller, Post, Get, Param } from '@nestjs/common';
import { ProposalPostDto } from './dto/proposalPost.dto';
import { ProposalPostService } from './proposal.service';

@Controller('jobProposal')
export class ProposalPostController {
  constructor(private proposalPostService: ProposalPostService) {}

  @Post()
  saveProposalPost(@Body() proposalPostDto: ProposalPostDto) {
    return this.proposalPostService.saveProposalPost(proposalPostDto);
  }

  @Get('/proposal/:userId/:jobId')
  getProposalPost(@Param('userId') userId: number, @Param('jobId') jobId: number) {
    return this.proposalPostService.getProposalPost(userId, jobId);
  }
}
