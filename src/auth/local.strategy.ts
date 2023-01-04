import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException, Headers } from '@nestjs/common';
import { AuthService } from './auth.service';
import Branch from 'src/core/enums/branch.enum';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthService) {
    super({
      usernameField: 'userNumber',
      passReqToCallback: true,
    });
  }

  async validate(
    req: Express.Request & {
      headers: { branch: Branch };
    },
    userNumber: string,
    password: string,
  ): Promise<any> {
    const { branch } = req.headers;

    const user = await this.authService.validateUser({
      userNumber: +userNumber,
      password,
      branch,
    });
    if (!user) {
      throw new UnauthorizedException();
    }
    return user;
  }
}
