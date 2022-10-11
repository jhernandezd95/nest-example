import { ApiProperty } from '@nestjs/swagger';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'stores' })
export class Store {
  @PrimaryGeneratedColumn('uuid')
  @ApiProperty({
    description: 'Identify of data base',
  })
  id: string;

  @Column('text', {
    unique: true,
  })
  @ApiProperty({
    description: 'Store name',
    required: true,
    example: 'Articulos de madera',
  })
  name: string;

  @Column({
    type: 'text',
    nullable: true,
  })
  @ApiProperty({
    description: 'Store description',
    required: false,
    example: 'Trabajamos con las mejores maderas',
  })
  description?: string;

  @Column({
    type: 'text',
    nullable: true,
  })
  @ApiProperty({
    description: 'Store address',
    required: false,
    example: 'Calle 23 # 12 entre 41 y 43',
  })
  address?: string;
}
