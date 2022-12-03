import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'containers-us-west-125.railway.app',
      port: 6098,
      database: 'railway',
      username: 'postgres',
      password: 'IxnFxrJDYiKPEiMKmmaP',
      synchronize: true,
      entities: [__dirname + '/**/*.entity{.js, .ts}'],
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
