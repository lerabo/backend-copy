import { IsString, IsNotEmpty, IsEmail } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { ClientSettingsEntity } from 'src/entities/clientSetttings.entity';

export class AuthDto {
  // @ApiProperty({ example: 'Alex', description: 'User first name' })
  firstName?: string;

  // @ApiProperty({ example: 'Smith', description: 'User last name' })
  lastName?: string;

  // @ApiProperty({ example: '+380123456789', description: 'User phone' })
  phone?: string;

  // @ApiProperty({ example: 1, description: 'User id for profile' })
  userId?: number;

  clientInfo: ClientSettingsEntity;

  @ApiProperty({ example: '12345678', description: 'User password' })
  password?: string;

  // @ApiProperty({ example: 'freelancer', description: 'User role' })
  role?: string;

  // @ApiProperty({ example: '435hgfrh56', description: 'User googleId' })
  googleId?: string;

  @ApiProperty({ example: 'example@gmail.com', description: 'User email' })
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

export class SwaggerTokenTypes {
  @ApiProperty({ example: 'gdsfgdasfgdsf', description: 'User access token' })
  access_token: string;

  @ApiProperty({ example: 1, description: 'User id for profile' })
  userId: number;

  @ApiProperty({ example: 'freelancer', description: 'User role' })
  role: string;
}
