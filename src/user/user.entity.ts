import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
  BeforeInsert,
  OneToMany,
} from 'typeorm';
import { hashSync } from 'bcrypt';

import { ApiProperty } from '@nestjs/swagger';
import { IsString } from '@nestjs/class-validator';
import { Movie } from 'src/movies/entities/movie.entity';

@Entity({ name: 'users' })
export class UserEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'user_name', nullable: false })
  @ApiProperty()
  @IsString()
  userName: string;

  @Column({ name: 'user_email', nullable: false })
  @ApiProperty()
  @IsString()
  userEmail: string;

  @Column({ name: 'user_password', nullable: false })
  @ApiProperty()
  @IsString()
  userPassword: string;

  @Column({ name: 'user_cpf', nullable: false })
  @ApiProperty()
  @IsString()
  userCpf: string;

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

  @BeforeInsert()
  hashPassword() {
    this.userPassword = hashSync(this.userPassword, 10);
  }

  @OneToMany(() => Movie, (movies) => movies.user)
  movies: Movie[];
}
