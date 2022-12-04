import { IsNotEmpty } from 'class-validator';
import { UserEntity } from 'src/user/user.entity';
export class CreateMovieDto {
  @IsNotEmpty()
  movieTitle: string;

  @IsNotEmpty()
  movieDescription: string;

  @IsNotEmpty()
  releaseYear: number;

  @IsNotEmpty()
  createdByUser: UserEntity;
}
