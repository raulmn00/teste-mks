import { IsNotEmpty } from 'class-validator';
export class CreateMovieDto {
  @IsNotEmpty()
  movieTitle: string;

  @IsNotEmpty()
  movieDescription: string;

  @IsNotEmpty()
  releaseYear: number;

  @IsNotEmpty()
  createdByUserId: string;
}
