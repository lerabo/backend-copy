import { IsEmail, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class ForgotPasswordDto {
  @ApiProperty({ example: 'example@gmail.com', description: 'User email' })
  @IsEmail()
  @IsString()
  readonly email: string;
}
