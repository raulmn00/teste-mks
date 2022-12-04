import { IsNotEmpty, IsEmail, Matches } from 'class-validator';
import { RegexHelper } from 'src/helpers/regex.helper';

export class CreateUserDto {
  @IsNotEmpty()
  userName: string;

  @IsNotEmpty()
  @IsEmail()
  userEmail: string;

  @IsNotEmpty()
  @Matches(RegexHelper.passwordRegex)
  userPassword: string;

  @IsNotEmpty()
  userCpf: string;
}
