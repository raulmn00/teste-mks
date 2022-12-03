import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { UserEntity } from './user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateUserDto } from './dto/createUser.dto';
import { UpdateUserDto } from './dto/updateUser.dto';

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
  async updateUserService(
    userId: string,
    userData: UpdateUserDto,
  ): Promise<UserEntity> {
    await this.userRepository.update(userId, userData);
    const userUpdated = await this.getUserById(userId);
    return userUpdated;
  }

  async getUserById(userId: string): Promise<UserEntity> {
    const userFound = await this.userRepository.findOneBy({ id: userId });
    return userFound;
  }

  async getAllUsers(): Promise<UserEntity[]> {
    const allUsers = await this.userRepository.find();
    return allUsers;
  }

  async deleteUserService(userId: string): Promise<boolean> {
    const userExists = await this.userRepository.delete(userId);
    if (userExists) {
      return true;
    } else {
      return false;
    }
  }
}
