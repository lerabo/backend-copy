import { IsNumber, IsString } from 'class-validator';

export class MessageDto {
  @IsNumber()
  chatRoomId: number;

  @IsNumber()
  userId: number;

  @IsString()
  text: string;
}
