import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { WorkLogEntity } from '../../entities/worklog.entity';

@Module({
  imports: [TypeOrmModule.forFeature([WorkLogEntity])],
})
export class WorkLogModule {}
