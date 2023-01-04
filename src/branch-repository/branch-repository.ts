import { Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import Branch from 'src/core/enums/branch.enum';
import IRepositories from 'src/core/types/i-respositories.type';
import { User } from 'src/users/entities/user.entity';
import { EntityClassOrSchema } from '@nestjs/typeorm/dist/interfaces/entity-class-or-schema.type';

@Injectable()
export class BranchRepositoryService<T> {
  constructor(
    @Inject('Entity')
    private readonly Entity: EntityClassOrSchema,
    // @InjectRepository(Entity, 'jeddah')
    private readonly jeddahRepository: Repository<T>,
    // @InjectRepository(Entity, 'riyadh')
    private readonly riyadhRepository: Repository<T>,
  ) {}

  private readonly _repostiories: IRepositories<T> = {
    jeddah: this.jeddahRepository,
    riyadh: this.riyadhRepository,
  };

  getRepository(branch: Branch): Repository<T> {
    return this._repostiories[branch];
  }
}
