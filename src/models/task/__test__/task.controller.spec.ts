import { GetTaskDto } from '../dto/get-task.dto';
import { getTaskStub } from './stub/get-task.stub';
import { TaskController } from '../task.controller';
import { TaskService } from '../task.service';
import { taskStub } from './stub/task.stub';
import { Test, TestingModule } from '@nestjs/testing';

describe('TaskController', () => {
  let taskController: TaskController;
  let taskService: TaskService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TaskController],
      providers: [
        {
          provide: TaskService,
          useValue: {
            create: jest.fn(),
            findAll: jest.fn(),
          },
        },
      ],
    }).compile();

    taskController = module.get<TaskController>(TaskController);
    taskService = module.get<TaskService>(TaskService);
  });

  it('should be defined', () => {
    expect(taskController).toBeDefined();
    expect(taskService).toBeDefined();
  });

  describe('create new task', () => {
    it('create method should be defined', () => {
      expect(taskController.create).toBeDefined();
    });

    let result = {};

    beforeEach(async () => {
      jest.spyOn(taskService, 'create').mockResolvedValueOnce(getTaskStub());
      result = await taskController.create(taskStub());
    });

    it('should call create method of task service', async () => {
      expect(taskService.create).toHaveBeenCalled();
      expect(taskService.create).toHaveBeenCalledTimes(1);
    });

    it('should return created task data', async () => {
      expect(result).toEqual(getTaskStub());
    });
  });

  describe('list task data', () => {
    it('findAll method should be defined', () => {
      expect(taskController.findAll).toBeDefined();
    });

    let result: GetTaskDto[] = [];

    beforeEach(async () => {
      jest.spyOn(taskService, 'findAll').mockResolvedValueOnce([getTaskStub()]);
      result = await taskController.findAll();
    });

    it('should call findAll method of task service', async () => {
      expect(taskService.findAll).toHaveBeenCalled();
      expect(taskService.findAll).toHaveBeenCalledTimes(1);
    });

    it('should return list of task data', async () => {
      expect(result).toEqual([getTaskStub()]);
    });
  });
});
