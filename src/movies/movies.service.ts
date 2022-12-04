import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from 'src/user/user.entity';
import { Repository } from 'typeorm';
import { CreateMovieDto } from './dto/create-movie.dto';
import { UpdateMovieDto } from './dto/update-movie.dto';
import { Movie } from './entities/movie.entity';

@Injectable()
export class MoviesService {
  constructor(
    @InjectRepository(Movie)
    private readonly movieRepository: Repository<Movie>,
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) {}
  async createMovieService(movieData: CreateMovieDto): Promise<Movie> {
    const user = await this.userRepository.findOneBy({
      id: movieData.createdByUser.id,
    });
    const movieCreated = this.movieRepository.create(movieData);
    movieCreated.userId = user;
    return this.movieRepository.save(movieCreated);
  }

  async findAll(): Promise<Movie[]> {
    const allMovies = await this.movieRepository.find({
      relations: { userId: true },
    });
    return allMovies;
  }

  async findOne(movieId: string): Promise<Movie> {
    const movieFound = await this.movieRepository.findOneBy({ id: movieId });
    return movieFound;
  }

  async update(id: string, movieData: UpdateMovieDto): Promise<Movie> {
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
