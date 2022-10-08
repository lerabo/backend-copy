import { IsString, IsNotEmpty, IsEmail } from 'class-validator';

export class UpdateDto {
  @IsEmail()
  @IsString()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  role: string;
  googleId: string;
}

export interface TokenTypes {
  access_token: string;
  userId: number;
  role: string;
}
