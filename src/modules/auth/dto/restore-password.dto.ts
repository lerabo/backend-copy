import { IsString, IsNotEmpty, MinLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class RestorePasswordDto {
  @ApiProperty({ example: 'gdsfgdasfgdsdfgf', description: 'User token' })
  @IsString()
  readonly token: string;

  @ApiProperty({ example: '12345678', description: 'User password' })
  @MinLength(8, {
    message: 'Password can`t be less than 8',
  })
  @IsString()
  @IsNotEmpty()
  readonly password: string;
}
