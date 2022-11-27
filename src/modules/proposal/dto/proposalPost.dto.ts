import { ApiProperty } from '@nestjs/swagger';

export class ProposalPostDto {
  @ApiProperty({ example: 1, description: 'Uniq identificator' })
  id: number;

  @ApiProperty({ example: 1, description: 'userId' })
  userId: number;

  @ApiProperty({ example: 1, description: 'Job post number' })
  jobPost: number;

  @ApiProperty({ example: 15, description: 'Job post price' })
  price: number;

  @ApiProperty({ example: 1, description: 'clientId' })
  clientId: number;

  @ApiProperty({ example: 'This is message for job post', description: 'Message for job post' })
  message: string;
}
