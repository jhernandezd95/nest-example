import { ApiProperty } from '@nestjs/swagger';
import {
  IsArray,
  IsInt,
  IsNumber,
  IsOptional,
  IsPositive,
  IsString,
  MinLength,
} from 'class-validator';

export class CreateItemDto {
  @IsString()
  @MinLength(1)
  @ApiProperty({
    description: 'Item name',
    required: true,
    example: 'Mesa para terraza',
  })
  name: string;

  @IsString()
  @IsOptional()
  @ApiProperty({
    description: 'Item description',
    required: false,
    example: 'Mesa comoda para 4 personas',
  })
  description?: string;

  @IsString()
  @IsOptional()
  @ApiProperty({
    description: 'Item unique identify on URL, it generate if not passed',
    required: false,
    example: 'mesa-para-terraza',
  })
  slug?: string;

  @IsNumber({
    allowNaN: false,
    allowInfinity: false,
  })
  @IsPositive()
  @ApiProperty({
    description: 'Item price',
    required: true,
    example: 79.99,
  })
  price: number;

  @IsInt()
  @IsPositive()
  @ApiProperty({
    description: 'Quantity available in stock',
    required: true,
    minimum: 1,
    example: 1,
  })
  stock: number;

  @IsArray()
  @IsString({
    each: true,
  })
  @ApiProperty({
    description: 'Key words, used in search',
    required: true,
    isArray: true,
    example: ['mesa', 'madera'],
  })
  tags: string[];

  @IsInt()
  @IsPositive()
  @ApiProperty({
    description: 'Store ID',
    required: true,
    example: 1,
  })
  storeId: number;
}
