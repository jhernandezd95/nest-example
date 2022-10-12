import { ApiProperty } from '@nestjs/swagger';
import { Store } from 'src/store/entities/store.entity';
import {
  BeforeInsert,
  BeforeUpdate,
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Image } from './image.entity';

@Entity({ name: 'items' })
export class Item {
  @PrimaryGeneratedColumn('uuid')
  @ApiProperty({
    description: 'Identify of data base',
  })
  id: string;

  @Column('text', {
    unique: true,
  })
  @ApiProperty({
    description: 'Item name',
    required: true,
    example: 'Mesa para terraza',
  })
  name: string;

  @Column({
    type: 'text',
    nullable: true,
  })
  @ApiProperty({
    description: 'Item description',
    required: false,
    example: 'Mesa comoda para 4 personas',
  })
  description: string;

  @Column('float', {
    default: 0,
  })
  @ApiProperty({
    description: 'Item price',
    required: true,
    example: 79.99,
  })
  price: number;

  @Column('text', {
    unique: true,
  })
  @ApiProperty({
    description: 'Item unique identify on URL, it generate if not passed',
    required: false,
    example: 'mesa-para-terraza',
  })
  slug: string;

  @Column('int', {
    default: 0,
  })
  @ApiProperty({
    description: 'Quantity available in stock',
    required: true,
    minimum: 1,
    example: 1,
  })
  stock: number;

  @Column('text', {
    array: true,
  })
  @ApiProperty({
    description: 'Key words, used in search',
    required: true,
    isArray: true,
    example: ['mesa', 'madera'],
  })
  tags: string[];

  @ManyToOne(() => Store, (store) => store.Items)
  Store: Store;

  @OneToMany(() => Image, (image) => image.Item, { cascade: true, eager: true })
  Images?: Image[];

  @BeforeInsert()
  checkSlugInsert() {
    if (!this.slug) {
      this.slug = this.name;
    }

    this.slug = this.slug
      .toLowerCase()
      .replaceAll(' ', '_')
      .replaceAll("'", '');
  }

  @BeforeUpdate()
  checkSlugUpdate() {
    this.slug = this.slug
      .toLowerCase()
      .replaceAll(' ', '_')
      .replaceAll("'", '');
  }
}
