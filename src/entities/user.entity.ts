import { Column, Entity, OneToMany } from 'typeorm';
import { SharedEntity } from './shared.entity';
import { TaskEntity } from './task.entity';
import { WorkLogEntity } from './work-log.entity';

@Entity({ name: 'user' })
export class UserEntity extends SharedEntity {
  @Column()
  name: string;

  @Column()
  email: string;

  @OneToMany(() => TaskEntity, (task) => task.user)
  tasks: TaskEntity[];

  @OneToMany(() => WorkLogEntity, (workLog) => workLog.user)
  workLogs: WorkLogEntity[];
}
