import { IsNotEmpty, IsEmail, Matches } from 'class-validator';
import { RegexHelper } from 'src/helpers/regex.helper';
import { Movie } from 'src/movies/entities/movie.entity';

export class CreateUserDto {
  @IsNotEmpty()
  userName: string;

  @IsNotEmpty()
  @IsEmail()
  userEmail: string;

  @IsNotEmpty()
  @Matches(RegexHelper.passwordRegex)
  userPassword: string;

  @IsNotEmpty()
  userCpf: string;

  @IsNotEmpty()
  movies: Movie[] = [];
}
