import { Injectable } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { JwtService } from '@nestjs/jwt';
import { User, UserWithoutPassword } from 'src/users/entities/user.entity';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  async verify(
    userNumber: number,
    password: string,
  ): Promise<UserWithoutPassword | null> {
    const user: User = await this.usersService.findOneByUserNumber(userNumber);
    if (user && user.password === password) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  async validateUser(
    userNumber: number,
    password: string,
  ): Promise<UserWithoutPassword | null> {
    const user: User = await this.usersService.findOneByUserNumber(userNumber);
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
