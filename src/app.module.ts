import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from './models/user/user.module';
import { TaskModule } from './models/task/task.module';
import { WorkLogModule } from './models/work-log/work-log.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'admin',
      password: 'admin',
      database: 'timetracking',
      autoLoadEntities: true,
      synchronize: true,
      logging: true,
    }),
    UserModule,
    TaskModule,
    WorkLogModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
