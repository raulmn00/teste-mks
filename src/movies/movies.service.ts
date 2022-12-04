import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from 'src/user/entities/user.entity';
import { Repository } from 'typeorm';
import { CreateMovieDto } from './dto/create-movie.dto';
import { UpdateMovieDto } from './dto/update-movie.dto';
import { MovieEntity } from './entities/movie.entity';

@Injectable()
export class MoviesService {
  constructor(
    @InjectRepository(MovieEntity)
    private readonly movieRepository: Repository<MovieEntity>,
  ) {}
  async createMovieService(movieData: CreateMovieDto): Promise<MovieEntity> {
    const movieCreated = this.movieRepository.create(movieData);
    return this.movieRepository.save(movieCreated);
  }

  async findAll(): Promise<MovieEntity[]> {
    const allMovies = await this.movieRepository.find({
      select: ['id', 'movieTitle', 'movieDescription', 'releaseYear'],
    });
    return allMovies;
  }

  async findOne(movieId: string): Promise<MovieEntity> {
    const movieFound = await this.movieRepository.findOneBy({ id: movieId });
    return movieFound;
  }

  async update(id: string, movieData: UpdateMovieDto): Promise<MovieEntity> {
    await this.movieRepository.update(id, movieData);
    const movieUpdated = await this.findOne(id);
    return movieUpdated;
  }

  async remove(id: string): Promise<boolean> {
    const movieExists = await this.movieRepository.delete(id);
    if (movieExists) {
      return true;
    } else {
      return false;
    }
  }
}
