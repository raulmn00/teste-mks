import { Body, Controller, Post } from '@nestjs/common';
import { CreateUserDto } from './dto/createUser.dto';
import { UpdateUserDto } from './dto/updateUser.dto';
import { UserEntity } from './user.entity';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  async createUserController(@Body() body: CreateUserDto) {
    return this.userService.createUserService(body);
  }

  async updateUserController(
    @Body() userData: UpdateUserDto,
  ): Promise<UserEntity> {
    return await this.userService.updateUserService(userData);
  }
}
