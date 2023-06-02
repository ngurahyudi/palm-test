import { Test, TestingModule } from '@nestjs/testing';
import { WorkLogController } from '../work-log.controller';
import { WorkLogEntity } from '../../../entities/work-log.entity';
import { WorkLogService } from '../work-log.service';
import { workLogStub } from './stub/work-log.stub';

describe('WorkLogController', () => {
  let workLogController: WorkLogController;
  let workLogService: WorkLogService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [WorkLogController],
      providers: [
        {
          provide: WorkLogService,
          useValue: {
            create: jest.fn(),
            findAll: jest.fn(),
          },
        },
      ],
    }).compile();

    workLogController = module.get<WorkLogController>(WorkLogController);
    workLogService = module.get<WorkLogService>(WorkLogService);
  });

  it('should be defined', () => {
    expect(workLogController).toBeDefined();
    expect(workLogService).toBeDefined();
  });

  const response = {
    id: 'some-id',
    ...workLogStub(),
  } as unknown as WorkLogEntity;

  describe('create new workLog', () => {
    it('create method should be defined', () => {
      expect(workLogController.create).toBeDefined();
    });

    let result = {};

    beforeEach(async () => {
      jest.spyOn(workLogService, 'create').mockResolvedValueOnce(response);
      result = await workLogController.create(workLogStub());
    });

    it('should call create method of workLog service', async () => {
      expect(workLogService.create).toHaveBeenCalled();
      expect(workLogService.create).toHaveBeenCalledTimes(1);
    });

    it('should return created workLog data', async () => {
      expect(result).toEqual(response);
    });
  });

  describe('list workLog data', () => {
    it('findAll method should be defined', () => {
      expect(workLogController.findAll).toBeDefined();
    });

    let result: WorkLogEntity[] = [];

    beforeEach(async () => {
      jest.spyOn(workLogService, 'findAll').mockResolvedValueOnce([response]);
      result = await workLogController.findAll();
    });

    it('should call findAll method of workLog service', async () => {
      expect(workLogService.findAll).toHaveBeenCalled();
      expect(workLogService.findAll).toHaveBeenCalledTimes(1);
    });

    it('should return list of workLog data', async () => {
      expect(result).toEqual([response]);
    });
  });
});
