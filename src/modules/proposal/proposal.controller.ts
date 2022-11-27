import { Body, Controller, Post, Get, Param } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { ProposalPostEntity } from 'src/entities/propasal.entity';
import { ProposalPostDto } from './dto/proposalPost.dto';
import { ProposalPostService } from './proposal.service';

@ApiTags('Job proposal')
@Controller('jobProposal')
export class ProposalPostController {
  constructor(private proposalPostService: ProposalPostService) {}

  @ApiOperation({ summary: 'Create Job proposal' })
  @ApiResponse({ status: 200, type: ProposalPostEntity })
  @Post()
  saveProposalPost(@Body() proposalPostDto: ProposalPostDto) {
    return this.proposalPostService.saveProposalPost(proposalPostDto);
  }

  @ApiOperation({ summary: 'Get Job proposal by ID' })
  @ApiResponse({ status: 200, type: ProposalPostEntity })
  @Get('/proposal/:userId/:jobId')
  getProposalPost(@Param('userId') userId: number, @Param('jobId') jobId: number) {
    return this.proposalPostService.getProposalPost(userId, jobId);
  }
}
