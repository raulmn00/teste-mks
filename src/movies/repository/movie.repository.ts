import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { CreateMovieDto } from '../dto/create-movie.dto';
import { UpdateMovieDto } from '../dto/update-movie.dto';
import { MovieEntity } from '../entities/movie.entity';

@Injectable()
export class MovieRepository {
  createMovie(movieData: CreateMovieDto): Promise<MovieEntity> {
    return null;
  }
  updateMovie(userData: UpdateMovieDto): Promise<MovieEntity> {
    return null;
  }

  deleteUser(userId: string): Promise<MovieEntity> {
    return null;
  }

  getUserById(userId: string): Promise<MovieEntity> {
    return null;
  }
  getAllUsers(): Promise<MovieEntity[]> {
    return null;
  }
}
