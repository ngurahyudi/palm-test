import { getRepositoryToken } from '@nestjs/typeorm';
import { InternalServerErrorException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Test, TestingModule } from '@nestjs/testing';
import { WorkLogEntity } from '../../../entities/work-log.entity';
import { WorkLogService } from '../work-log.service';
import { workLogStub } from './stub/work-log.stub';

describe('WorkLogService', () => {
  let workLogService: WorkLogService;
  let workLogRepository: Repository<WorkLogEntity>;

  const WORK_LOG_REPOSITORY_TOKEN = getRepositoryToken(WorkLogEntity);

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        WorkLogService,
        {
          provide: WORK_LOG_REPOSITORY_TOKEN,
          useValue: {
            create: jest.fn(),
            save: jest.fn(),
            find: jest.fn(),
          },
        },
      ],
    }).compile();

    workLogService = module.get<WorkLogService>(WorkLogService);
    workLogRepository = module.get<Repository<WorkLogEntity>>(
      WORK_LOG_REPOSITORY_TOKEN,
    );
  });

  it('should be defined', () => {
    expect(workLogService).toBeDefined();
    expect(workLogRepository).toBeDefined();
  });

  const response = {
    id: 'some-id',
    ...workLogStub(),
  } as unknown as WorkLogEntity;

  describe('create new workLog', () => {
    it('create method should be defined', () => {
      expect(workLogService.create).toBeDefined();
    });

    let result = {};

    beforeEach(async () => {
      jest.spyOn(workLogRepository, 'save').mockResolvedValueOnce(response);
      result = await workLogService.create(workLogStub());
    });

    it('should call create method of workLog service', async () => {
      expect(workLogRepository.create).toHaveBeenCalled();
      expect(workLogRepository.save).toHaveBeenCalled();
      expect(workLogRepository.create).toHaveBeenCalledTimes(1);
      expect(workLogRepository.save).toHaveBeenCalledTimes(1);
    });

    it('should return created workLog data', async () => {
      expect(result).toEqual(response);
    });

    it('should throw internal server error', async () => {
      jest
        .spyOn(workLogRepository, 'save')
        .mockRejectedValueOnce(new InternalServerErrorException('some-error'));

      await expect(workLogService.create(workLogStub())).rejects.toBeInstanceOf(
        InternalServerErrorException,
      );
    });
  });

  describe('list workLog data', () => {
    it('findAll method should be defined', () => {
      expect(workLogService.findAll).toBeDefined();
    });

    let result: WorkLogEntity[] = [];

    beforeEach(async () => {
      jest.spyOn(workLogRepository, 'find').mockResolvedValueOnce([response]);
      result = await workLogService.findAll();
    });

    it('should call findAll method of workLog service', async () => {
      expect(workLogRepository.find).toHaveBeenCalled();
      expect(workLogRepository.find).toHaveBeenCalledTimes(1);
    });

    it('should return list of workLog data', async () => {
      expect(result).toEqual([response]);
    });

    it('should throw internal server error', async () => {
      jest
        .spyOn(workLogRepository, 'find')
        .mockRejectedValueOnce(new InternalServerErrorException('some-error'));

      await expect(workLogService.findAll()).rejects.toBeInstanceOf(
        InternalServerErrorException,
      );
    });
  });
});
