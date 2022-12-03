import { Test, TestingModule } from '@nestjs/testing';
import { CreateUserDto } from './dto/createUser.dto';
import { UserController } from './user.controller';
import { UserEntity } from './user.entity';
import { UserService } from './user.service';

describe('UserController', () => {
  let userController: UserController;
  let userService: UserService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserController],
      providers: [
        {
          provide: UserService,
          useValue: {
            createUserService: jest.fn(),
          },
        },
      ],
    }).compile();

    userController = module.get<UserController>(UserController);
    userService = module.get<UserService>(UserService);
  });

  it('should be defined', () => {
    expect(userController).toBeDefined();
    expect(userService).toBeDefined();
  });

  describe('create user', () => {
    it('should create a new user with success', async () => {
      //Arrange
      const body: CreateUserDto = {
        userName: 'Raul',
        userEmail: 'raul.mariaci@gmail.com',
        userCpf: '48973031848',
        userPassword: 'senhasegura123',
      };
      const userEntityMock = { ...body } as UserEntity;
      jest
        .spyOn(userService, 'createUserService')
        .mockResolvedValueOnce(userEntityMock);
      //Act
      const result = await userController.createUserController(body);
      //Assert
      expect(result).toBeDefined();
      expect(userService.createUserService).toBeCalledTimes(1);
    });
  });
});
