import { ApiProperty } from '@nestjs/swagger';

import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Item } from './item.entity';

@Entity({ name: 'images' })
export class Image {
  @PrimaryGeneratedColumn('uuid')
  @ApiProperty({
    description: 'Identify of data base',
  })
  id: string;

  @Column('text')
  @ApiProperty({
    description: 'Image name',
    required: true,
    example: 'Image name',
  })
  name: string;

  @ManyToOne(() => Item, (item) => item.Images)
  Item: Item[];
}
