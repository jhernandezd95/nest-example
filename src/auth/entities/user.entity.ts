import { ApiProperty } from '@nestjs/swagger';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

enum Role {
  ADMIN = 'admin',
  OWNER = 'owner',
  CLIENT = 'client',
}

@Entity({ name: 'users' })
export class User {
  @PrimaryGeneratedColumn('uuid')
  @ApiProperty({
    description: 'Identify of data base',
  })
  id: string;

  @Column('text', {
    unique: true,
    select: false,
  })
  @ApiProperty({
    description: 'User email',
    required: true,
    example: 'josue@mail.com',
  })
  email: string;

  @Column('text', {
    select: false,
  })
  @ApiProperty({
    description: 'User password',
    required: true,
    example: '123456a',
  })
  password: string;

  @Column('text')
  @ApiProperty({
    description: 'User name',
    required: true,
    example: 'Josue',
  })
  name: string;

  @Column('text')
  @ApiProperty({
    description: 'User last name',
    required: false,
    example: 'Diaz',
  })
  lastName: string;

  @Column('date')
  @ApiProperty({
    description: 'User birthday',
    required: true,
    example: '1988-06-21',
  })
  birthday: Date;

  @Column('boolean')
  @ApiProperty({
    description: 'If the user is active',
    required: true,
    example: true,
    default: false,
  })
  isActive: boolean;

  @Column('date')
  @ApiProperty({
    description: 'Last login date',
    required: false,
    example: '2022-11-02',
  })
  lastLogin: Date;

  @Column({
    type: 'enum',
    enum: Role,
    default: Role.CLIENT,
  })
  @ApiProperty({
    description: 'Role assigned to user',
    required: true,
    enum: Role,
    example: Role.OWNER,
  })
  role: string[];
}
