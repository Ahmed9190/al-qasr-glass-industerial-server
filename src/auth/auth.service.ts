import { Injectable } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { JwtService } from '@nestjs/jwt';
import { User, UserWithoutPassword } from 'src/users/entities/user.entity';
import Branch from 'src/core/enums/branch.enum';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  async verify({
    userNumber,
    password,
    branch,
  }: IAuthParams): Promise<UserWithoutPassword | null> {
    const user: User = await this.usersService.findOneByUserNumber(
      userNumber,
      branch,
    );
    if (user && user.password === password) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  async validateUser({
    userNumber,
    password,
    branch,
  }: IAuthParams): Promise<UserWithoutPassword | null> {
    const user: User = await this.usersService.findOneByUserNumber(
      userNumber,
      branch,
    );
    if (user && user.password === password) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  async signIn(userWithoutPassword: UserWithoutPassword) {
    const payload = {
      sub: userWithoutPassword.userNumber,
      driverNumber: userWithoutPassword.driverNumber,
    };

    const token = this.jwtService.sign(payload);

    return { token };
  }
}

interface IAuthParams {
  userNumber: number;
  password: string;
  branch: Branch;
}
