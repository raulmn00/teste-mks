import { Injectable } from '@nestjs/common';
import { UserEntity } from 'src/user/entities/user.entity';
import { UserService } from 'src/user/user.service';
import { compareSync } from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { TypeBody } from './dto/authBodyType';
@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  async login(user: TypeBody) {
    await this.validateUser(user.userEmail, user.userPassword);
    const payload = { sub: user.userEmail };

    return {
      token: this.jwtService.sign(payload),
    };
  }
  async validateUser(email: string, password: string) {
    try {
      const user = await this.userService.getOneUserOrFail(email);
      console.log(user, 'validate user authservice');
      const isPasswordValid = compareSync(password, user.userPassword);
      if (!isPasswordValid) {
        return null;
      }
      return user;
    } catch (err) {
      return null;
    }
  }
}
