import { ApiProperty } from '@nestjs/swagger';
import { Item } from 'src/item/entities/item.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

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

  @OneToMany(() => Item, (item) => item.Store, { cascade: true, eager: true })
  Items?: Item[];
}
