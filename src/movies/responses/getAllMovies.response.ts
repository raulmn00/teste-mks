import { Exclude } from 'class-transformer';
import { UserResponse } from 'src/user/response/User.response';
import { UserEntity } from 'src/user/user.entity';
import { Movie } from '../entities/movie.entity';

export class GetAll {
  constructor(partial: Partial<Movie>) {
    delete partial.userId.userPassword;

    Object.assign(this, partial);
  }

  id: string;
  movieTitle: string;
  movieDescription: string;
  releaseYear: number;
  createdAt: string;
  updatedAt: string;
  deletedAt: string;
  userId: UserResponse;
}
