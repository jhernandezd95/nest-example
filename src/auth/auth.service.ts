import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcrypt';
import { Repository } from 'typeorm';
import { JwtService } from '@nestjs/jwt';

import { CreateUserDto } from './dto/create-user.dto';
import { LoginDto } from './dto/login.dto';
import { User } from './entities/user.entity';
import { JwtPayload } from './interfaces/jwt-payload.interface';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private readonly jwtService: JwtService,
  ) {}

  async createUser(createUserDto: CreateUserDto) {
    createUserDto.password = bcrypt.hashSync(createUserDto.password, 10);

    const user = this.userRepository.create(createUserDto);

    await this.userRepository.save(user);

    return {
      ...user,
      token: this.generateJwt({ email: user.email }),
    };
  }

  async login(loginDto: LoginDto) {
    const user = await this.userRepository.findOne({
      where: { email: loginDto.email },
      select: { email: true, password: true },
    });

    if (!user) {
      throw new NotFoundException(`Credentials are not valid.`);
    }

    if (!bcrypt.compareSync(loginDto.password, user.password)) {
      throw new NotFoundException(`Credentials are not valid.`);
    }

    return user;
  }

  private generateJwt(payload: JwtPayload) {
    const token = this.jwtService.sign(payload);
    return token;
  }
}
