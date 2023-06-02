import { GetUserDto } from '../dto/get-user.dto';
import { getUserStub } from './stub/get-user.stub';
import { Test, TestingModule } from '@nestjs/testing';
import { UserController } from '../user.controller';
import { UserService } from '../user.service';
import { userStub } from './stub/user.stub';

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

  describe('create new user', () => {
    it('create method should be defined', () => {
      expect(userController.create).toBeDefined();
    });

    let result = {};

    beforeEach(async () => {
      jest.spyOn(userService, 'create').mockResolvedValueOnce(getUserStub());
      result = await userController.create(userStub());
    });

    it('should call create method of user service', async () => {
      expect(userService.create).toHaveBeenCalled();
      expect(userService.create).toHaveBeenCalledTimes(1);
    });

    it('should return created user data', async () => {
      expect(result).toEqual(getUserStub());
    });
  });

  describe('list user data', () => {
    it('findAll method should be defined', () => {
      expect(userController.findAll).toBeDefined();
    });

    let result: GetUserDto[] = [];

    beforeEach(async () => {
      jest.spyOn(userService, 'findAll').mockResolvedValueOnce([getUserStub()]);
      result = await userController.findAll();
    });

    it('should call findAll method of user service', async () => {
      expect(userService.findAll).toHaveBeenCalled();
      expect(userService.findAll).toHaveBeenCalledTimes(1);
    });

    it('should return list of user data', async () => {
      expect(result).toEqual([getUserStub()]);
    });
  });
});
