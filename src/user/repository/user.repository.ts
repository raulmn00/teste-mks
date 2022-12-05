import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ExceptionClass } from 'src/exceptions/Exception';
import { Exceptions } from 'src/exceptions/exceptionsHelper';
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
    try {
      const userCreated = await this.typeOrmRepository.save(userData);
      return userCreated;
    } catch (err) {
      throw new ExceptionClass(
        Exceptions.DatabaseException,
        'Error creating user. Cpf or email already exists.',
      );
    }
  }
  async updateUser(
    userData: UpdateUserDto,
    idUser: string,
  ): Promise<UserEntity> {
    try {
      const userToUpdate = await this.getUserById(idUser);
      this.typeOrmRepository.merge(userToUpdate, userData);
      return await this.typeOrmRepository.save(userToUpdate);
    } catch (err) {
      throw new ExceptionClass(
        Exceptions.DatabaseException,
        'Error updating user. Please, verify the data sent.',
      );
    }
  }
  async deleteUser(userId: string): Promise<UserEntity> {
    try {
      const userToDelete = await this.getUserById(userId);
      await this.typeOrmRepository.softDelete(userId);
      return userToDelete;
    } catch (err) {
      throw new ExceptionClass(
        Exceptions.DatabaseException,
        'Error deleting user. Please verify the ID sent.',
      );
    }
  }
  async getUserById(userId: string): Promise<UserEntity> {
    try {
      const userFound = await this.typeOrmRepository.findOne({
        where: { id: userId },
        relations: { movies: true },
      });
      return userFound;
    } catch (err) {
      throw new ExceptionClass(
        Exceptions.DatabaseException,
        'Error finding user. Please verify the ID sent.',
      );
    }
  }
  async getAllUsersRepository(): Promise<UserEntity[]> {
    const allUsers = await this.typeOrmRepository.find({
      relations: { movies: true },
    });
    return allUsers;
  }
  async getOneUserOrFail(userEmail: string): Promise<UserEntity> {
    try {
      const user = await this.typeOrmRepository.findOne({
        where: { userEmail: userEmail },
      });
      return user;
    } catch (err) {
      throw new Error('User not found.');
    }
  }
}
