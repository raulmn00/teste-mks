import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseUUIDPipe,
  Patch,
  Post,
} from '@nestjs/common';
import { CreateUserDto } from './dto/createUser.dto';
import { UpdateUserDto } from './dto/updateUser.dto';
import { UserEntity } from './entities/user.entity';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  async createUserController(@Body() body: CreateUserDto): Promise<UserEntity> {
    return this.userService.createUserService(body);
  }

  @Patch(':id')
  async updateUserController(
    @Body() userData: UpdateUserDto,
    @Param('id', new ParseUUIDPipe()) userId: string,
  ): Promise<UserEntity> {
    return await this.userService.updateUserService(userData, userId);
  }

  @Get()
  async getAllUsersController(): Promise<UserEntity[]> {
    return await this.userService.getAllUsersService();
  }
  @Get(':id')
  async getUserByIdController(
    @Param('id', new ParseUUIDPipe()) userId: string,
  ): Promise<UserEntity> {
    return await this.userService.getUserById(userId);
  }

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
