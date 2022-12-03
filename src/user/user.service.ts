import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { UserEntity } from './user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateUserDto } from './dto/createUser.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) {}
  async createUserService(data: CreateUserDto): Promise<UserEntity> {
    const userEntityCreated = this.userRepository.create(data);
    return this.userRepository.save(userEntityCreated);
  }
}
