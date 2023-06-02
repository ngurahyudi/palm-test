import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { WorkLogEntity } from '../../entities/work-log.entity';
import { WorkLogController } from './work-log.controller';
import { WorkLogService } from './work-log.service';

@Module({
  imports: [TypeOrmModule.forFeature([WorkLogEntity])],
  controllers: [WorkLogController],
  providers: [WorkLogService],
})
export class WorkLogModule {}
