import { GetUserDto } from './dto/get-user.dto';
import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserDto } from './dto/user.dto';
import { UserEntity } from '../../entities/user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) {}

  async create(data: UserDto): Promise<GetUserDto> {
    try {
      const user = await this.userRepository.save(
        this.userRepository.create(data),
      );

      return new GetUserDto(user.id, user.name, user.email);
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }

  async findAll(): Promise<GetUserDto[]> {
    try {
      const users = await this.userRepository.find();

      return users.map(
        (user) => new GetUserDto(user.id, user.name, user.email),
      );
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }
}
