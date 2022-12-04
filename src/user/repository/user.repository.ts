import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from '../dto/createUser.dto';
import { UpdateUserDto } from '../dto/updateUser.dto';
import { UserEntity } from '../entities/user.entity';

@Injectable()
export class UserRepository {
  constructor(
    @InjectRepository(UserEntity)
    private readonly typeOrmRepository: Repository<UserEntity>,
  ) {}
  async createUser(userData: CreateUserDto): Promise<UserEntity> {
    const userCreated = await this.typeOrmRepository.save(userData);
    return userCreated;
  }
  async updateUser(
    userData: UpdateUserDto,
    idUser: string,
  ): Promise<UserEntity> {
    const userToUpdate = await this.getUserById(idUser);
    this.typeOrmRepository.merge(userToUpdate, userData);
    return await this.typeOrmRepository.save(userToUpdate);
  }
  async deleteUser(userId: string): Promise<boolean> {
    const userToDelete = await this.getUserById(userId);
    if (!userToDelete) {
      throw new Error('Usuário não encontrado.');
    }
    await this.typeOrmRepository.delete(userId);
    return true;
  }
  async getUserById(userId: string): Promise<UserEntity> {
    const userFound = await this.typeOrmRepository.findOne({
      where: { id: userId },
      relations: { movies: true },
    });
    return userFound;
  }
  async getAllUsersRepository(): Promise<UserEntity[]> {
    const allUsers = await this.typeOrmRepository.find({
      relations: { movies: true },
    });
    return allUsers;
  }
}
