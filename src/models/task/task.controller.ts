import { Body, Controller, Get, Post } from '@nestjs/common';
import { TaskDto } from './dto/task.dto';
import { TaskService } from './task.service';

@Controller('task')
export class TaskController {
  constructor(private readonly taskService: TaskService) {}

  @Post()
  create(@Body() data: TaskDto) {
    return this.taskService.create(data);
  }

  @Get()
  findAll() {
    return this.taskService.findAll();
  }
}
