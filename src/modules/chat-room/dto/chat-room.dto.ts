import { ApiProperty } from '@nestjs/swagger';
import { IsNumber } from 'class-validator';

export class ChatRoomDto {
  @ApiProperty({ example: 'freelancer', description: 'Status for deleting chat' })
  deletedFor?: string;

  @ApiProperty({ example: 'accepted', description: 'Status of active room or not' })
  activeRoom: string;

  @ApiProperty({ example: 1, description: 'Job post id' })
  @IsNumber()
  jobPostId: number;

  @ApiProperty({ example: 1, description: 'Id of sender' })
  @IsNumber()
  senderId: number;

  @ApiProperty({ example: 1, description: 'Id of recipient' })
  @IsNumber()
  receiverId: number;
}
