import { GetTaskDto } from '../../dto/get-task.dto';

export const getTaskStub = (): GetTaskDto => {
  return {
    id: 'some-id',
    title: 'some-task-title',
    description: 'some-task-description',
    userId: 'some-user-id',
  };
};
