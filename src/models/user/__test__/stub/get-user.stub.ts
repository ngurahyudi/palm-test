import { GetUserDto } from '../../dto/get-user.dto';

export const getUserStub = (): GetUserDto => {
  return {
    id: 'some-id',
    name: 'John Doe',
    email: 'kenaa@example.com',
  };
};
