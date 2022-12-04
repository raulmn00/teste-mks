import { Injectable } from '@nestjs/common';
import { UserEntity } from './entities/user.entity';
import { CreateUserDto } from './dto/createUser.dto';
import { UpdateUserDto } from './dto/updateUser.dto';
import { UserRepository } from './repository/user.repository';

@Injectable()
export class UserService {
  constructor(private readonly userRepository: UserRepository) {}
  async createUserService(data: CreateUserDto): Promise<UserEntity> {
    const userEntityCreated = this.userRepository.createUser(data);
    return userEntityCreated;
  }
  async updateUserService(userData: UpdateUserDto): Promise<UserEntity> {
    await this.userRepository.updateUser(userData);
    const userUpdated = await this.userRepository.getUserById(userData.id);
    return userUpdated;
  }

  async getUserById(userId: string): Promise<UserEntity> {
    const userFound = await this.userRepository.getUserById(userId);
    return userFound;
  }

  async getAllUsers(): Promise<UserEntity[]> {
    const allUsers = await this.userRepository.getAllUsers();
    return allUsers;
  }

  async deleteUserService(userId: string): Promise<boolean> {
    const userExists = await this.userRepository.deleteUser(userId);
    if (userExists) {
      return true;
    } else {
      return false;
    }
  }
}
