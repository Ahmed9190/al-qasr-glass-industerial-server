import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>,
  ) {}

  async findOneByUserNumber(userNumber: number): Promise<User | undefined> {
    if (!isNaN(userNumber))
      return await this.usersRepository.findOneBy({ userNumber });
  }
}
