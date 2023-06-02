import { InjectRepository } from '@nestjs/typeorm';
import { QueryFailedError, Repository } from 'typeorm';
import { TaskDto } from './dto/task.dto';
import { TaskEntity } from '../../entities/task.entity';
import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';

@Injectable()
export class TaskService {
  constructor(
    @InjectRepository(TaskEntity)
    private readonly taskRepository: Repository<TaskEntity>,
  ) {}

  async create(data: TaskDto): Promise<TaskEntity> {
    try {
      return await this.taskRepository.save(this.taskRepository.create(data));
    } catch (error) {
      if (error instanceof QueryFailedError)
        throw new BadRequestException('User does not exist');

      throw new InternalServerErrorException(error.message);
    }
  }

  async findAll(): Promise<TaskEntity[]> {
    try {
      return await this.taskRepository.find();
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }
}
