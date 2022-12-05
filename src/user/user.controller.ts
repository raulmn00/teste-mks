import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { CreateUserDto } from './dto/createUser.dto';
import { UpdateUserDto } from './dto/updateUser.dto';
import { UserEntity } from './entities/user.entity';
import { UserService } from './user.service';
import { handleException } from 'src/exceptions/exceptionsHelper';
import { UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  async createUserController(@Body() body: CreateUserDto): Promise<UserEntity> {
    try {
      return this.userService.createUserService(body);
    } catch (err) {
      handleException(err);
    }
  }
  @UseGuards(AuthGuard('jwt'))
  @Patch(':id')
  async updateUserController(
    @Body() userData: UpdateUserDto,
    @Param('id') userId: string,
  ): Promise<UserEntity> {
    try {
      return await this.userService.updateUserService(userData, userId);
    } catch (err) {
      handleException(err);
    }
  }

  @UseGuards(AuthGuard('jwt'))
  @Get()
  async getAllUsersController(): Promise<UserEntity[]> {
    return await this.userService.getAllUsersService();
  }
  @UseGuards(AuthGuard('jwt'))
  @Get(':id')
  async getUserByIdController(
    @Param('id') userId: string,
  ): Promise<UserEntity> {
    try {
      return await this.userService.getUserById(userId);
    } catch (err) {
      handleException(err);
    }
  }
  @UseGuards(AuthGuard('jwt'))
  @Delete(':id')
  async deleteUserController(@Param('id') userId: string): Promise<string> {
    const userIsDeleted = await this.userService.deleteUserService(userId);
    if (userIsDeleted) {
      return 'User deleted with success.';
    } else {
      return 'User not found.';
    }
  }
}
