import { Injectable } from '@nestjs/common';
import { CreateMovieDto } from './dto/create-movie.dto';
import { UpdateMovieDto } from './dto/update-movie.dto';
import { MovieEntity } from './entities/movie.entity';
import { MovieRepository } from './repository/movie.repository';

@Injectable()
export class MoviesService {
  constructor(private readonly movieRepository: MovieRepository) {}
  async createMovieService(movieData: CreateMovieDto): Promise<MovieEntity> {
    const movieCreated = this.movieRepository.createMovie(movieData);
    return movieCreated;
  }

  async findAll(): Promise<MovieEntity[]> {
    const allMovies = await this.movieRepository.getAllMovies();
    return allMovies;
  }

  async findOne(movieId: string): Promise<MovieEntity> {
    const movieFound = await this.movieRepository.getMovieById(movieId);
    return movieFound;
  }

  async update(movieData: UpdateMovieDto): Promise<MovieEntity> {
    await this.movieRepository.updateMovie(movieData);
    const movieUpdated = await this.findOne(movieData.id);
    return movieUpdated;
  }

  async remove(id: string): Promise<boolean> {
    const movieExists = await this.movieRepository.deleteMovie(id);
    if (movieExists) {
      return true;
    } else {
      return false;
    }
  }
}
