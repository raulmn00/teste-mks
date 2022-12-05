import { Controller, Req, Post, UseGuards, Body } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { TypeBody } from '../auth/dto/authBodyType';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}
  @Post('login')
  async login(@Body() body: TypeBody) {
    return await this.authService.login(body);
  }
}
