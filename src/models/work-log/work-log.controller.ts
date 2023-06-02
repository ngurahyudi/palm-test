import { Body, Controller, Get, Post } from '@nestjs/common';
import { WorkLogDto } from './dto/work-log.dto';
import { WorkLogService } from './work-log.service';

@Controller('work-log')
export class WorkLogController {
  constructor(private readonly workLogService: WorkLogService) {}

  @Post()
  create(@Body() data: WorkLogDto) {
    return this.workLogService.create(data);
  }

  @Get()
  findAll() {
    return this.workLogService.findAll();
  }
}
