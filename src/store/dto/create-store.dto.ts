import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString, MinLength } from 'class-validator';

export class CreateStoreDto {
  @IsString()
  @MinLength(1)
  @ApiProperty({
    description: 'Store name',
    required: true,
    example: 'Articulos de madera',
  })
  name: string;

  @IsString()
  @IsOptional()
  @ApiProperty({
    description: 'Store description',
    required: false,
    example: 'Trabajamos con las mejores maderas',
  })
  description?: string;

  @IsString()
  @IsOptional()
  @ApiProperty({
    description: 'Store address',
    required: false,
    example: 'Calle 23 # 12 entre 41 y 43',
  })
  address?: string;
}
