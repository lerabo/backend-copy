import { ApiProperty } from '@nestjs/swagger';

export class InviteTalentDto {
  @ApiProperty({ example: 'Hello', description: 'Invite talent message' })
  message: string;

  @ApiProperty({ example: 1, description: 'clientId' })
  clientId: number;

  @ApiProperty({ example: 1, description: 'freelancerId' })
  freelancerId: number;

  @ApiProperty({ example: 1, description: 'profileId' })
  profileId: number;

  @ApiProperty({ example: 1, description: 'jobPostId' })
  jobPostId: number;

  @ApiProperty({ example: 'Sample title', description: 'job title ' })
  jobTitle: string;
}
