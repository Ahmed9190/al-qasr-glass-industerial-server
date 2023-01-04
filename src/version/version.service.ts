import { Injectable } from '@nestjs/common';
import Branch from 'src/core/enums/branch.enum';

@Injectable()
export class VersionService {
  getCurrentVersion(): string {
    return process.env.CURRENT_VERSION;
  }
  getLastAppUrl(branch: Branch): string {
    return process.env[`${branch.toUpperCase()}_APK`];
  }
}
