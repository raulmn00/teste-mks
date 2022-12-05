import { PartialType } from '@nestjs/mapped-types';
import { ApiProperty } from '@nestjs/swagger';
import { CreateUserDto } from './createUser.dto';

export class UpdateUserDto extends PartialType(CreateUserDto) {
  @ApiProperty()
  id: string;
}
