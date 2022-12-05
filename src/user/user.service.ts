import { Injectable } from '@nestjs/common';
import { UserEntity } from './entities/user.entity';
import { CreateUserDto } from './dto/createUser.dto';
import { UpdateUserDto } from './dto/updateUser.dto';
import { UserRepository } from './repository/user.repository';
import { hashSync } from 'bcrypt';
import { ExceptionClass } from 'src/exceptions/Exception';
import { Exceptions } from 'src/exceptions/exceptionsHelper';

@Injectable()
export class UserService {
  constructor(private readonly userRepository: UserRepository) {}
  async createUserService(data: CreateUserDto): Promise<UserEntity> {
    try {
      data.userPassword = hashSync(data.userPassword, 10);
      const userEntityCreated = await this.userRepository.createUser(data);
      return userEntityCreated;
    } catch (err) {
      throw new ExceptionClass(
        Exceptions.InvalidData,
        'Error creating user. Please verify the data sent.',
      );
    }
  }
  async updateUserService(
    userData: UpdateUserDto,
    idUser: string,
  ): Promise<UserEntity> {
    const userUpdated = await this.userRepository.updateUser(userData, idUser);
    return userUpdated;
  }

  async getUserById(userId: string): Promise<UserEntity> {
    const userFound = await this.userRepository.getUserById(userId);
    delete userFound.userPassword;
    return userFound;
  }

  async getOneUserOrFail(userEmail: string): Promise<UserEntity> {
    const user = await this.userRepository.getOneUserOrFail(userEmail);
    return user;
  }

  async getAllUsersService(): Promise<UserEntity[]> {
    //console.log('SERVICE');
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
