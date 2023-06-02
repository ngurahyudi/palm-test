import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { WorkLogDto } from './dto/work-log.dto';
import { WorkLogEntity } from '../../entities/work-log.entity';

@Injectable()
export class WorkLogService {
  constructor(
    @InjectRepository(WorkLogEntity)
    private readonly workLogRepository: Repository<WorkLogEntity>,
  ) {}

  async create(data: WorkLogDto): Promise<WorkLogEntity> {
    try {
      return await this.workLogRepository.save(
        this.workLogRepository.create(data),
      );
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }

  async findAll(): Promise<WorkLogEntity[]> {
    try {
      return await this.workLogRepository.find();
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }
}
