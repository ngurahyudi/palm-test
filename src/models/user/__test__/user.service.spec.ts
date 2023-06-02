import { getRepositoryToken } from '@nestjs/typeorm';
import { GetUserDto } from '../dto/get-user.dto';
import { getUserStub } from './stub/get-user.stub';
import { InternalServerErrorException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Test, TestingModule } from '@nestjs/testing';
import { UserEntity } from '../../../entities/user.entity';
import { UserService } from '../user.service';
import { userStub } from './stub/user.stub';

describe('UserService', () => {
  let userService: UserService;
  let userRepository: Repository<UserEntity>;

  const USER_REPOSITORY_TOKEN = getRepositoryToken(UserEntity);

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserService,
        {
          provide: USER_REPOSITORY_TOKEN,
          useValue: {
            create: jest.fn(),
            save: jest.fn(),
            find: jest.fn(),
          },
        },
      ],
    }).compile();

    userService = module.get<UserService>(UserService);
    userRepository = module.get<Repository<UserEntity>>(USER_REPOSITORY_TOKEN);
  });

  it('should be defined', () => {
    expect(userService).toBeDefined();
    expect(userRepository).toBeDefined();
  });

  describe('create new user', () => {
    it('create method should be defined', () => {
      expect(userService.create).toBeDefined();
    });

    let result = {};

    beforeEach(async () => {
      jest
        .spyOn(userRepository, 'save')
        .mockResolvedValueOnce(getUserStub() as unknown as UserEntity);
      result = await userService.create(userStub());
    });

    it('should call create method of user service', async () => {
      expect(userRepository.create).toHaveBeenCalled();
      expect(userRepository.save).toHaveBeenCalled();
      expect(userRepository.create).toHaveBeenCalledTimes(1);
      expect(userRepository.save).toHaveBeenCalledTimes(1);
    });

    it('should return created user data', async () => {
      expect(result).toEqual(getUserStub());
    });

    it('should throw internal server error', async () => {
      jest
        .spyOn(userRepository, 'save')
        .mockRejectedValueOnce(new InternalServerErrorException('some-error'));

      await expect(userService.create(userStub())).rejects.toBeInstanceOf(
        InternalServerErrorException,
      );
    });
  });

  describe('list user data', () => {
    it('findAll method should be defined', () => {
      expect(userService.findAll).toBeDefined();
    });

    let result: GetUserDto[] = [];

    beforeEach(async () => {
      jest
        .spyOn(userRepository, 'find')
        .mockResolvedValueOnce([getUserStub()] as unknown as UserEntity[]);
      result = await userService.findAll();
    });

    it('should call findAll method of user service', async () => {
      expect(userRepository.find).toHaveBeenCalled();
      expect(userRepository.find).toHaveBeenCalledTimes(1);
    });

    it('should return list of user data', async () => {
      expect(result).toEqual([getUserStub()]);
    });

    it('should throw internal server error', async () => {
      jest
        .spyOn(userRepository, 'find')
        .mockRejectedValueOnce(new InternalServerErrorException('some-error'));

      await expect(userService.findAll()).rejects.toBeInstanceOf(
        InternalServerErrorException,
      );
    });
  });
});
