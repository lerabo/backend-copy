import { IsNumber } from 'class-validator';

export class ChatRoomDto {
  @IsNumber()
  jobPostId: number;

  @IsNumber()
  senderId: number;
}
