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
    const movieCreated = await this.typeOrmRepository.save(movieData);
    if (!movieCreated) {
      throw new Error('Erro ao criar o filme.');
    } else {
      return movieCreated;
    }
  }
  async updateMovie(
    movieData: UpdateMovieDto,
    idMovie: string,
  ): Promise<MovieEntity> {
    const movieToUpdate = await this.getMovieById(idMovie);
    this.typeOrmRepository.merge(movieToUpdate, movieData);
    return await this.typeOrmRepository.save(movieToUpdate);
  }

  async deleteMovie(movieId: string): Promise<boolean> {
    const movieToDelete = await this.getMovieById(movieId);
    if (!movieToDelete) {
      throw new Error('Filme não encontrado.');
    }
    await this.typeOrmRepository.softDelete(movieId);
    return true;
  }

  async getMovieById(movieId: string): Promise<MovieEntity> {
    const movieFound = await this.typeOrmRepository.findOne({
      where: { id: movieId },
      relations: { createdByUser: true },
    });
    return movieFound;
  }
  async getAllMovies(): Promise<MovieEntity[]> {
    const allMovies = await this.typeOrmRepository.find({
      relations: { createdByUser: true },
    });
    return allMovies;
  }
}
