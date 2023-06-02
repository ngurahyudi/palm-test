import { getRepositoryToken } from '@nestjs/typeorm';
import { InternalServerErrorException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { TaskEntity } from '../../../entities/task.entity';
import { TaskService } from '../task.service';
import { taskStub } from './stub/task.stub';
import { Test, TestingModule } from '@nestjs/testing';

describe('TaskService', () => {
  let taskService: TaskService;
  let taskRepository: Repository<TaskEntity>;

  const TASK_REPOSITORY_TOKEN = getRepositoryToken(TaskEntity);

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        TaskService,
        {
          provide: TASK_REPOSITORY_TOKEN,
          useValue: {
            create: jest.fn(),
            save: jest.fn(),
            find: jest.fn(),
          },
        },
      ],
    }).compile();

    taskService = module.get<TaskService>(TaskService);
    taskRepository = module.get<Repository<TaskEntity>>(TASK_REPOSITORY_TOKEN);
  });

  it('should be defined', () => {
    expect(taskService).toBeDefined();
    expect(taskRepository).toBeDefined();
  });

  const response = {
    id: 'some-id',
    ...taskStub(),
  } as unknown as TaskEntity;

  describe('create new task', () => {
    it('create method should be defined', () => {
      expect(taskService.create).toBeDefined();
    });

    let result = {};

    beforeEach(async () => {
      jest.spyOn(taskRepository, 'save').mockResolvedValueOnce(response);
      result = await taskService.create(taskStub());
    });

    it('should call create method of task service', async () => {
      expect(taskRepository.create).toHaveBeenCalled();
      expect(taskRepository.save).toHaveBeenCalled();
      expect(taskRepository.create).toHaveBeenCalledTimes(1);
      expect(taskRepository.save).toHaveBeenCalledTimes(1);
    });

    it('should return created task data', async () => {
      expect(result).toEqual(response);
    });

    it('should throw internal server error', async () => {
      jest
        .spyOn(taskRepository, 'save')
        .mockRejectedValueOnce(new InternalServerErrorException('some-error'));

      await expect(taskService.create(taskStub())).rejects.toBeInstanceOf(
        InternalServerErrorException,
      );
    });
  });

  describe('list task data', () => {
    it('findAll method should be defined', () => {
      expect(taskService.findAll).toBeDefined();
    });

    let result: TaskEntity[] = [];

    beforeEach(async () => {
      jest.spyOn(taskRepository, 'find').mockResolvedValueOnce([response]);
      result = await taskService.findAll();
    });

    it('should call findAll method of task service', async () => {
      expect(taskRepository.find).toHaveBeenCalled();
      expect(taskRepository.find).toHaveBeenCalledTimes(1);
    });

    it('should return list of task data', async () => {
      expect(result).toEqual([response]);
    });

    it('should throw internal server error', async () => {
      jest
        .spyOn(taskRepository, 'find')
        .mockRejectedValueOnce(new InternalServerErrorException('some-error'));

      await expect(taskService.findAll()).rejects.toBeInstanceOf(
        InternalServerErrorException,
      );
    });
  });
});
