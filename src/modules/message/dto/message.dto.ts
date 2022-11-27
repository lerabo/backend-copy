import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsString } from 'class-validator';

export class MessageDto {
  @ApiProperty({ example: 'sample link', description: 'link to job' })
  jobLink?: string;

  @ApiProperty({ example: 1, description: 'Id of chat room' })
  @IsNumber()
  chatRoomId: number;

  @ApiProperty({ example: 1, description: 'Id of user' })
  @IsNumber()
  userId: number;

  @ApiProperty({ example: 'hello', description: 'sample message text' })
  @IsString()
  text: string;
}
