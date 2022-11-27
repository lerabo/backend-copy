import { Body, Controller, Post, Get, Param, Put, Patch, Query } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { OfferEntity } from 'src/entities/offer.entity';
import { UpdateResult } from 'typeorm';
import { FindContractDto } from './dto/contract.offer.dto';
import { OfferDto } from './dto/jobOffer.dto';
import { UpdateOfferDto } from './dto/update.offer.dto';
import { OfferPostService } from './offer.service';

@ApiTags('Job offer')
@Controller('jobOffer')
export class OfferPostController {
  constructor(private offerPostService: OfferPostService) {}

  @ApiOperation({ summary: 'Create job offer' })
  @ApiResponse({ status: 200, type: OfferEntity })
  @Post('offer')
  saveJobOffer(@Body() offerDto: OfferDto): Promise<UpdateResult | OfferEntity> {
    return this.offerPostService.saveJobOffer(offerDto);
  }

  @ApiOperation({ summary: 'Get single job offer by IDS' })
  @ApiResponse({ status: 200, type: [OfferEntity] })
  @Get('job/:id/:freelancerId/:clientId')
  getJobOfferByProfile(
    @Param('id') id: number,
    @Param('freelancerId') freelancerId: number,
    @Param('clientId') clientId: number,
  ): Promise<OfferEntity[]> {
    return this.offerPostService.getJobOfferByProfile(Number(id), Number(freelancerId), Number(clientId));
  }

  @ApiOperation({ summary: 'Update job offer by ID' })
  @ApiResponse({ status: 200, type: UpdateResult })
  @Put(':jobId/:freelancerId/:clientId')
  updateJobOffer(
    @Param('jobId') jobId: number,
    @Param('freelancerId') freelancerId: number,
    @Param('clientId') clientId: number,
    @Body() status: UpdateOfferDto,
  ): Promise<UpdateResult> {
    return this.offerPostService.updateJobOffer(Number(jobId), Number(freelancerId), Number(clientId), status);
  }

  @ApiOperation({ summary: 'Get all job offers' })
  @ApiResponse({ status: 200, type: [OfferEntity] })
  @Get('job')
  getJobOffer(): Promise<OfferEntity[]> {
    return this.offerPostService.getJobOffer();
  }

  @ApiOperation({ summary: 'Update exist job offers' })
  @ApiResponse({ status: 200, type: OfferEntity })
  @Put('offer')
  updateJobOfferByProfile(@Body() offerDto: OfferDto): Promise<UpdateResult | OfferEntity> {
    return this.offerPostService.updateJobOfferByProfile(offerDto);
  }

  @ApiOperation({ summary: 'Update expired status' })
  @ApiResponse({ status: 200, type: UpdateOfferDto })
  @Put()
  updateExpiredStatus(@Body() updateOfferDto: UpdateOfferDto): Promise<UpdateOfferDto> {
    return this.offerPostService.updateExpiredStatus(updateOfferDto);
  }

  @ApiOperation({ summary: 'Get all status' })
  @ApiResponse({ status: 200, type: [OfferEntity] })
  @Get('offer/:userId/:role')
  getOfferAccepted(
    @Param('userId') id: string,
    @Param('role') role: string,
    @Query() userQuery: FindContractDto,
  ): Promise<OfferEntity[]> {
    return this.offerPostService.getOfferAccepted(Number(id), role, userQuery);
  }
}
