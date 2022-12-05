import { IsNotEmpty, IsEmail, Matches } from 'class-validator';
import { RegexHelper } from 'src/helpers/regex.helper';
import { MovieEntity } from 'src/movies/entities/movie.entity';
import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
  @ApiProperty()
  @IsNotEmpty()
  userName: string;

  @IsNotEmpty()
  @ApiProperty()
  @IsEmail()
  userEmail: string;

  @IsNotEmpty()
  @ApiProperty()
  @Matches(RegexHelper.passwordRegex)
  userPassword: string;

  @IsNotEmpty()
  @ApiProperty()
  userCpf: string;

  @IsNotEmpty()
  movies: MovieEntity[] = [];
}
