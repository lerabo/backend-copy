import { ApiProperty } from '@nestjs/swagger';

export class ClientSettingsDto {
  @ApiProperty({ example: 'Adam', description: 'Client name' })
  name: string;

  @ApiProperty({ example: 'Poland', description: 'Client country' })
  country: string;
  photo: string;

  @ApiProperty({ example: 'sample of website', description: 'Client website' })
  website?: string;

  @ApiProperty({ example: 'IT', description: 'Client industry' })
  industry?: string;

  @ApiProperty({ example: '12', description: 'Client quantity ' })
  quantity?: string;

  @ApiProperty({ example: 'awesome', description: 'Client description' })
  description?: string;

  @ApiProperty({ example: 1, description: 'userId' })
  userId: number;
}
