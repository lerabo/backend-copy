import { ApiProperty } from '@nestjs/swagger';
import { DateOrders } from './offer.types';

export class FindContractDto {
  @ApiProperty({ required: false, example: 'ASC', description: 'Offer order by' })
  date?: DateOrders;

  @ApiProperty({ required: false, example: 'pending', description: 'Offer status' })
  status?: string;
}
