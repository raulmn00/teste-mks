import { Module } from '@nestjs/common';
import { MoviesService } from './movies.service';
import { MoviesController } from './movies.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MovieEntity } from './entities/movie.entity';
import { UserEntity } from 'src/user/entities/user.entity';
import { MovieRepository } from './repository/movie.repository';

@Module({
  imports: [TypeOrmModule.forFeature([MovieEntity, UserEntity])],
  controllers: [MoviesController],
  providers: [MoviesService, MovieRepository],
  exports: [MoviesService],
})
export class MoviesModule {}
