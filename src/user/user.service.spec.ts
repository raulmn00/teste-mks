import { Test, TestingModule } from '@nestjs/testing';
import { UserService } from './user.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { UserEntity } from './user.entity';
import { Repository } from 'typeorm';
import { CreateUserDto } from '../user/dto/createUser.dto';

describe('UserService', () => {
  let userService: UserService;
  let userRepository: Repository<UserEntity>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserService,
        {
          provide: getRepositoryToken(UserEntity),
          useValue: {
            create: jest.fn(),
            save: jest.fn(),
          },
        },
      ],
    }).compile();

    userService = module.get<UserService>(UserService);
    userRepository = module.get<Repository<UserEntity>>(
      getRepositoryToken(UserEntity),
    );
  });

  it('should be defined', () => {
    expect(userService).toBeDefined();
    expect(userRepository).toBeDefined();
  });

  describe('create user', () => {
    it('should create a user with success', async () => {
      //Arrange
      const data: CreateUserDto = {
        userName: 'Raul',
        userEmail: 'raul.mariaci@gmail.com',
        userCpf: '48973031848',
        userPassword: 'senhasegura123',
      };
      const userRepositoryMock = {
        userName: 'Raul',
        userEmail: 'raul.mariaci@gmail.com',
        userCpf: '48973031848',
        userPassword: 'senhasegura123',
      } as UserEntity;
      jest
        .spyOn(userRepository, 'create')
        .mockReturnValueOnce(userRepositoryMock);
      jest
        .spyOn(userRepository, 'save')
        .mockResolvedValueOnce(userRepositoryMock);
      //Act
      const result = await userService.createUserService(data);
      //Assert
      expect(result).toBeDefined();
      expect(userRepository.create).toBeCalledTimes(1);
      expect(userRepository.save).toBeCalledTimes(1);
    });
  });
});
