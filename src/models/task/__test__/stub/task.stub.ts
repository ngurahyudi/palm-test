import { TaskDto } from '../../dto/task.dto';

export const taskStub = (): TaskDto => {
  return {
    title: 'some-task-title',
    description: 'some-task-description',
    userId: 'some-user-id',
  };
};
