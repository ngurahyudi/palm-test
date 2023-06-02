import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { SharedEntity } from './shared.entity';
import { TaskEntity } from './task.entity';
import { UserEntity } from './user.entity';

@Entity({ name: 'worklog' })
export class WorkLogEntity extends SharedEntity {
  @Column({ name: 'user_id', length: 36 })
  userId: string;
  @ManyToOne(() => UserEntity, (user) => user.workLogs)
  @JoinColumn({ name: 'user_id' })
  user: UserEntity;

  @Column({ name: 'task_id', length: 36 })
  taskId: string;
  @ManyToOne(() => TaskEntity, (task) => task.workLogs)
  @JoinColumn({ name: 'task_id' })
  task: TaskEntity;

  @Column({
    type: 'decimal',
    precision: 10,
    scale: 2,
    comment: 'duration in seconds',
  })
  durations: number;
}
