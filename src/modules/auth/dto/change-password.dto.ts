import { IsString, IsNotEmpty, MinLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class ChangePasswordDto {
  @ApiProperty({ example: 'example@gmail.com', description: 'User email' })
  @IsString()
  readonly email: string;

  @ApiProperty({ example: '12345678', description: 'User old password' })
  @IsString()
  @IsNotEmpty()
  readonly oldPassword: string;

  @ApiProperty({ example: '12345678', description: 'User new password' })
  @MinLength(8, {
    message: 'Password can`t be less than 8',
  })
  @IsString()
  @IsNotEmpty()
  readonly newPassword: string;
}
