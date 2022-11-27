import { IsString, IsNotEmpty, IsEmail, isNumber } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateDto {
  @ApiProperty({ example: 'example@gmail.com', description: 'User email' })
  @IsEmail()
  @IsString()
  @IsNotEmpty()
  email: string;

  @ApiProperty({ example: 'freelancer', description: 'User role' })
  @IsString()
  @IsNotEmpty()
  role: string;

  @ApiProperty({ example: '435hgfrh56', description: 'User googleId' })
  googleId: string;

  @ApiProperty({ example: 1, description: 'User id for profile' })
  @IsNotEmpty()
  userId: number;
}

export interface TokenTypes {
  access_token: string;
  userId: number;
  role: string;
}
