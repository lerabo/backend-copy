import { ApiProperty } from '@nestjs/swagger';

export class OfferDto {
  @ApiProperty({ example: 1, description: 'Offer id' })
  id: number;

  @ApiProperty({ example: 10, description: 'Offer price' })
  price: number;

  @ApiProperty({ example: '2022-01-01-T12:00:00.000Z', description: 'Offer start date' })
  startDate: Date;

  @ApiProperty({ example: 'expired', description: 'Offer status' })
  status?: string;

  @ApiProperty({ example: '2022-01-01-T12:00:00.000Z', description: 'Offer end date' })
  endDate: Date;

  @ApiProperty({ example: 1, description: 'freelancerId' })
  freelancerId: number;

  @ApiProperty({ example: 1, description: 'clientId' })
  clientId: number;

  @ApiProperty({ example: 1, description: 'jobPostId' })
  jobPostId: number;

  @ApiProperty({ example: 'Offer by Alex', description: 'Offer name' })
  name: string;
}
