import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsEnum, IsOptional } from 'class-validator';
import { Status } from './offer.types';

export class UpdateOfferDto {
  @ApiProperty({ enum: Status, description: 'Offer status' })
  @IsEnum(Status)
  status: Status;

  @ApiProperty({ example: [1, 2], description: 'Offer ids' })
  @IsArray()
  @IsOptional()
  id: number[];
}
