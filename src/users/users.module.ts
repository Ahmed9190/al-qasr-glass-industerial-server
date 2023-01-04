import { Module } from '@nestjs/common';
import { User } from './entities/user.entity';
import { UsersService } from './users.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import Branch from 'src/core/enums/branch.enum';

@Module({
  imports: [
    TypeOrmModule.forFeature([User], Branch.jeddah),
    TypeOrmModule.forFeature([User], Branch.riyadh),
  ],
  providers: [UsersService],
  exports: [UsersService],
})
export class UsersModule {}
