import { Module } from '@nestjs/common';
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';
import { UserModule } from './user/user.module';
import { ConfigModule } from '@nestjs/config';
import { MoviesModule } from './movies/movies.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot({
      type: process.env.DB_CONNECTION,
      host: process.env.DB_HOST,
      port: process.env.DB_PORT,
      database: process.env.DB_DATABASE,
      username: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      synchronize: true,
      entities: [__dirname + '/**/*.entity{.js, .ts}'],
    } as TypeOrmModuleOptions),
    UserModule,
    MoviesModule,
    AuthModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
