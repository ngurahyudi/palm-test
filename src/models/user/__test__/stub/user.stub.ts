import { UserDto } from '../../dto/user.dto';

export const userStub = (): UserDto => {
  return {
    name: 'John Doe',
    email: 'kenaa@example.com',
  };
};
