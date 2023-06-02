import { WorkLogDto } from '../../dto/work-log.dto';

export const workLogStub = (): WorkLogDto => {
  return {
    userId: 'some-user-id',
    taskId: 'some-task-id',
    durations: 86400,
  };
};
