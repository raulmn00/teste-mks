import { IsNotEmpty } from 'class-validator';
import { UserEntity } from 'src/user/entities/user.entity';
import { ApiProperty } from '@nestjs/swagger';
export class CreateMovieDto {
  @ApiProperty()
  @IsNotEmpty()
  movieTitle: string;

  @IsNotEmpty()
  @ApiProperty()
  movieDescription: string;

  @IsNotEmpty()
  @ApiProperty()
  releaseYear: number;

  @IsNotEmpty()
  @ApiProperty()
  createdByUser: UserEntity;
}
