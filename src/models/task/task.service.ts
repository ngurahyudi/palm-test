import { GetTaskDto } from './dto/get-task.dto';
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

  async create(data: TaskDto): Promise<GetTaskDto> {
    try {
      const task = await this.taskRepository.save(
        this.taskRepository.create(data),
      );

      return new GetTaskDto(task.id, task.title, task.description, task.userId);
    } catch (error) {
      if (error instanceof QueryFailedError)
        throw new BadRequestException('User does not exist');

      throw new InternalServerErrorException(error.message);
    }
  }

  async findAll(): Promise<GetTaskDto[]> {
    try {
      const tasks = await this.taskRepository.find();

      return tasks.map(
        (task) =>
          new GetTaskDto(task.id, task.title, task.description, task.userId),
      );
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }
}
