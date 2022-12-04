import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
  ManyToOne,
} from 'typeorm';

import { ApiProperty } from '@nestjs/swagger';
import { IsString } from '@nestjs/class-validator';
import { UserEntity } from 'src/user/user.entity';
@Entity({ name: 'movies' })
export class Movie {
  @PrimaryGeneratedColumn('uuid')
  id: string;
  @Column({ name: 'movie_title', nullable: false })
  @ApiProperty()
  @IsString()
  movieTitle: string;

  @Column({ name: 'movie_description', nullable: false })
  @ApiProperty()
  @IsString()
  movieDescription: string;

  @Column({ name: 'release_year', nullable: false })
  @ApiProperty()
  @IsString()
  releaseYear: number;

  @CreateDateColumn({ name: 'created_at' })
  @ApiProperty()
  @IsString()
  createdAt: string;

  @UpdateDateColumn({ name: 'updated_at' })
  @ApiProperty()
  @IsString()
  updatedAt: string;

  @DeleteDateColumn({ name: 'deleted_at' })
  @ApiProperty()
  @IsString()
  deletedAt: string;

  @ManyToOne(() => UserEntity, (user) => user.movies)
  user: UserEntity;
}
