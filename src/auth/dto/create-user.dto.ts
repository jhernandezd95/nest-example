import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsString,
  MinLength,
  MaxLength,
  Matches,
  IsDateString,
} from 'class-validator';

export class CreateUserDto {
  @IsEmail()
  @ApiProperty({
    description: 'User email',
    required: true,
    example: 'josue@mail.com',
  })
  email: string;

  @IsString()
  @MinLength(6)
  @MaxLength(50)
  @Matches(/(?:(?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
    message:
      'The password must have a Uppercase, lowercase letter and a number',
  })
  @ApiProperty({
    description: 'User password',
    required: true,
    example: 'qwE123',
  })
  password: string;

  @IsString()
  @MinLength(1)
  @ApiProperty({
    description: 'User name',
    required: true,
    example: 'Josue',
  })
  name: string;

  @IsString()
  @MinLength(1)
  @ApiProperty({
    description: 'User last name',
    required: false,
    example: 'Diaz',
  })
  lastName?: string;

  @IsDateString()
  @ApiProperty({
    description: 'User birthday',
    required: true,
    example: '1988-06-21',
  })
  birthday: Date;
}
