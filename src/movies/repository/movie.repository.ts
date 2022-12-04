import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateMovieDto } from '../dto/create-movie.dto';
import { UpdateMovieDto } from '../dto/update-movie.dto';
import { MovieEntity } from '../entities/movie.entity';

@Injectable()
export class MovieRepository {
  constructor(
    @InjectRepository(MovieEntity)
    private readonly typeOrmRepository: Repository<MovieEntity>,
  ) {}
  async createMovie(movieData: CreateMovieDto): Promise<MovieEntity> {
    const movieCreated = await this.typeOrmRepository.create(movieData);
    if (!movieCreated) {
      throw new Error('Erro ao criar o filme.');
    } else {
      await this.typeOrmRepository.save(movieCreated);
      return movieCreated;
    }
  }
  updateMovie(userData: UpdateMovieDto): Promise<MovieEntity> {
    return null;
  }

  deleteMovie(userId: string): Promise<MovieEntity> {
    return null;
  }

  getMovieById(userId: string): Promise<MovieEntity> {
    return null;
  }
  async getAllMovies(): Promise<MovieEntity[]> {
    const allMovies = await this.typeOrmRepository.find({
      relations: { createdByUser: true },
    });
    return allMovies;
  }
}
