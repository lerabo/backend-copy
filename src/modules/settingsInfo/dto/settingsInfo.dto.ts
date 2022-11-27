import { ApiProperty } from '@nestjs/swagger';

export class SettingsInfoDto {
  @ApiProperty({ example: 1, description: 'Uniq identificator' })
  id: number;

  @ApiProperty({ example: 'Alex', description: 'User first name' })
  firstName: string;

  @ApiProperty({ example: 'Smith', description: 'User last name' })
  lastName: string;

  @ApiProperty({ example: 'example@gmail.com', description: 'User email' })
  email: string;

  @ApiProperty({ example: '+380123456789', description: 'User phone' })
  phone: string;

  @ApiProperty({ example: 1, description: 'User id for profile' })
  userId: number;

  @ApiProperty({ example: 1, description: 'User for profile' })
  user: number;
}
