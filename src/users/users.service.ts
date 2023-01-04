import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import Branch from 'src/core/enums/branch.enum';

import { InjectRepository } from '@nestjs/typeorm';
import IRepositories from 'src/core/types/i-respositories.type';

@Injectable()
export class UsersService {
  private _branchRepostiories: IRepositories<User>;

  constructor(
    @InjectRepository(User, Branch.jeddah)
    private readonly jeddahUserRepository: Repository<User>,
    @InjectRepository(User, Branch.riyadh)
    private readonly riyadhUserRepository: Repository<User>,
  ) {
    this._branchRepostiories = {
      jeddah: this.jeddahUserRepository,
      riyadh: this.riyadhUserRepository,
    };
  }

  async findOneByUserNumber(
    userNumber: number,
    branchName: Branch,
  ): Promise<User | undefined> {
    if (!isNaN(userNumber))
      return await this._branchRepostiories[branchName].findOneBy({
        userNumber,
      });
  }
}
