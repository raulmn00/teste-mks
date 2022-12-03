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
  async updateUserService(data: UpdateUserDto): Promise<UserEntity> {
    await this.userRepository.update(data.id, data);
    const userUpdated = await this.getUserById(data.id);
    return userUpdated;
  }

  async getUserById(userId: string): Promise<UserEntity> {
    const userFound = await this.userRepository.findOne({
      where: { id: userId },
    });
    return userFound;
  }

  async getAllUsers(): Promise<UserEntity[]> {
    const allUsers = await this.userRepository.find();
    return allUsers;
  }

  async deleteUserService(userId: string): Promise<string> {
    await this.userRepository.delete(userId);
    return 'User deletado com sucesso!';
  }
}
