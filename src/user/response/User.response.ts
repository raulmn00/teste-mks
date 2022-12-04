import { Exclude } from 'class-transformer';
import { UserEntity } from 'src/user/user.entity';

export class UserResponse {
  constructor(partial: Partial<UserEntity>) {
    delete partial.userPassword;
    Object.assign(this, partial);
  }

  id: string;
  userName: string;
  userEmail: string;
  userCpf: string;
  createdAt: string;
  updatedAt: string;
  deletedAt: string;
}
