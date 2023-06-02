import { Test, TestingModule } from '@nestjs/testing';
import { UserController } from '../user.controller';
import { UserService } from '../user.service';
import { userStub } from './stub/user.stub';
import { UserEntity } from '../../../entities/user.entity';

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
            create: jest.fn(),
            findAll: jest.fn(),
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

  const response = {
    id: 'some-id',
    ...userStub(),
  } as unknown as UserEntity;

  describe('create new user', () => {
    it('create method should be defined', () => {
      expect(userController.create).toBeDefined();
    });

    let result = {};

    beforeEach(async () => {
      jest.spyOn(userService, 'create').mockResolvedValueOnce(response);
      result = await userController.create(userStub());
    });

    it('should call create method of user service', async () => {
      expect(userService.create).toHaveBeenCalled();
      expect(userService.create).toHaveBeenCalledTimes(1);
    });

    it('should return created user data', async () => {
      expect(result).toEqual(response);
    });
  });

  describe('list user data', () => {
    it('findAll method should be defined', () => {
      expect(userController.findAll).toBeDefined();
    });

    let result: UserEntity[] = [];

    beforeEach(async () => {
      jest.spyOn(userService, 'findAll').mockResolvedValueOnce([response]);
      result = await userController.findAll();
    });

    it('should call findAll method of user service', async () => {
      expect(userService.findAll).toHaveBeenCalled();
      expect(userService.findAll).toHaveBeenCalledTimes(1);
    });

    it('should return list of user data', async () => {
      expect(result).toEqual([response]);
    });
  });
});
