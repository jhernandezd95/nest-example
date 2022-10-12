import { ApiProperty } from '@nestjs/swagger';
import { IsEmail } from 'class-validator';

export class LoginDto {
  @IsEmail()
  @ApiProperty({
    description: 'User email',
    required: true,
    example: 'josue@mail.com',
  })
  email: string;

  @ApiProperty({
    description: 'User password',
    required: true,
    example: 'qwE123',
  })
  password: string;
}
