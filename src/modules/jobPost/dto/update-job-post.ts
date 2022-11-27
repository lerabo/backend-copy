import { ApiProperty } from '@nestjs/swagger';

export class UpdateJobPostDto {
  @ApiProperty({ example: 'Developer', description: 'Job title' })
  jobTitle: string;

  @ApiProperty({ example: 12, description: 'From hour rate' })
  fromHourRate: number;

  @ApiProperty({ example: 23, description: 'TO hour rate' })
  toHourRate: number;

  @ApiProperty({ example: 'short', description: 'Job duration' })
  jobDuration: string;

  @ApiProperty({ example: 'smart', description: 'Job description' })
  jobDescription: string;

  @ApiProperty({ example: 1, description: 'userId' })
  userId: number;
}
