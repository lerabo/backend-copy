import { ApiProperty } from '@nestjs/swagger';
import { IsNumber } from 'class-validator';

export class ChatRoomDto {
  @ApiProperty({ example: 'freelancer', description: 'Status for deleting chat' })
  deletedFor?: string;

  @ApiProperty({ example: 'accepted', description: 'Status of active room or not' })
  activeRoom: string;

  @ApiProperty({ example: 'forFreelancer', description: 'To whom send message' })
  sendedFor: string;

  @ApiProperty({ example: 1, description: 'Job post id' })
  @IsNumber()
  jobPostId: number;

  @ApiProperty({ example: 1, description: 'Id of client' })
  @IsNumber()
  clientId: number;

  @ApiProperty({ example: 1, description: 'Id of freelancer' })
  @IsNumber()
  freelancerId: number;
}
