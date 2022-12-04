import { Injectable } from '@nestjs/common';
import { UserEntity } from './entities/user.entity';
import { CreateUserDto } from './dto/createUser.dto';
import { UpdateUserDto } from './dto/updateUser.dto';
import { UserRepository } from './repository/user.repository';
import { hashSync } from 'bcrypt';

@Injectable()
export class UserService {
  constructor(private readonly userRepository: UserRepository) {}
  async createUserService(data: CreateUserDto): Promise<UserEntity> {
    data.userPassword = hashSync(data.userPassword, 10);

    const userEntityCreated = await this.userRepository.createUser(data);

    return userEntityCreated;
  }
  async updateUserService(
    userData: UpdateUserDto,
    userId: string,
  ): Promise<UserEntity> {
    await this.userRepository.updateUser(userData);
    const userUpdated = await this.userRepository.getUserById(userId);
    return userUpdated;
  }

  async getUserById(userId: string): Promise<UserEntity> {
    const userFound = await this.userRepository.getUserById(userId);
    return userFound;
  }

  async getAllUsersService(): Promise<UserEntity[]> {
    console.log('SERVICE');
    const allUsers = await this.userRepository.getAllUsersRepository();
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
