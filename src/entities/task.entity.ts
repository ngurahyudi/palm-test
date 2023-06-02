import { Column, Entity, JoinColumn, ManyToOne, OneToMany } from 'typeorm';
import { SharedEntity } from './shared.entity';
import { UserEntity } from './user.entity';
import { WorkLogEntity } from './worklog.entity';

@Entity({ name: 'task' })
export class TaskEntity extends SharedEntity {
  @Column()
  title: string;

  @Column()
  description: string;

  @Column({ name: 'user_id', length: 36 })
  userId: string;
  @ManyToOne(() => UserEntity, (user) => user.tasks)
  @JoinColumn({ name: 'user_id' })
  user: UserEntity;

  @OneToMany(() => WorkLogEntity, (workLog) => workLog.task)
  workLogs: WorkLogEntity[];
}
