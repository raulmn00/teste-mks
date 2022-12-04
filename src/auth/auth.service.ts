import { Injectable } from '@nestjs/common';
import { UserEntity } from 'src/user/entities/user.entity';
import { UserService } from 'src/user/user.service';
import { compareSync } from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  async login(user) {
    const payload = { sub: user.id, email: user.email };

    return {
      token: this.jwtService.sign(payload),
    };
  }
  async validateUser(email: string, password: string) {
    let user: UserEntity;
    try {
      user = await this.userService.getOneUserOrFail(email);
    } catch (err) {
      return null;
    }
    const isPasswordValid = compareSync(password, user.userPassword);
    if (!isPasswordValid) {
      return null;
    }
    return user;
  }
}
