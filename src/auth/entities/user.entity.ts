import { ApiProperty } from '@nestjs/swagger';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

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

  @Column('boolean', { default: false })
  @ApiProperty({
    description: 'If the user is active',
    required: true,
    example: true,
    default: false,
  })
  isActive: boolean;

  @Column('boolean', { default: false })
  @ApiProperty({
    description: 'If the user was baned by the admin',
    required: true,
    example: true,
    default: false,
  })
  isAccountNonLocked: boolean;

  @Column('boolean', { default: false })
  @ApiProperty({
    description: 'If the account was expired',
    required: true,
    example: true,
    default: false,
  })
  isAccountNonExpired: boolean;

  @Column('text', {
    unique: true,
    select: false,
  })
  @ApiProperty({
    description: 'Pin used for active account.',
    required: false,
    example: '12345s',
  })
  pin: string;

  @Column({
    type: 'date',
    nullable: true,
  })
  @ApiProperty({
    description: 'Last login date',
    required: false,
    example: '2022-11-02',
  })
  lastLogin: Date;

  @CreateDateColumn()
  createdAt: Date; // Creation date

  @UpdateDateColumn()
  updatedAt: Date; // Last updated date

  @DeleteDateColumn()
  deletedAt: Date; // Deletion date

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
  roles: string[];
}
