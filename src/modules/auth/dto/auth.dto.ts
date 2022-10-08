import { IsString, IsNotEmpty, IsEmail } from 'class-validator';

export class AuthDto {
  firstName?: string;
  lastName?: string;
  phone?: string;
  userId?: number;
  password?: string;
  role?: string;
  googleId?: string;
  @IsEmail()
  @IsString()
  @IsNotEmpty()
  email: string;
}
export interface TokenTypes {
  access_token: string;
  userId: number;
  role: string;
}
