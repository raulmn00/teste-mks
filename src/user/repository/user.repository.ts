import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { CreateUserDto } from '../dto/createUser.dto';
import { UpdateUserDto } from '../dto/updateUser.dto';
import { UserEntity } from '../entities/user.entity';

@Injectable()
export class UserRepository {
  createUser(userData: CreateUserDto): Promise<UserEntity> {
    return null;
  }
  updateUser(userData: UpdateUserDto): Promise<UserEntity> {
    return null;
  }
  deleteUser(userId: string): Promise<boolean> {
    return null;
  }
  getUserById(userId: string): Promise<UserEntity> {
    return null;
  }
  getAllUsers(): Promise<UserEntity[]> {
    return null;
  }
}
