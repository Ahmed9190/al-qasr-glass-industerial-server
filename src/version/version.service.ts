import { Injectable } from '@nestjs/common';

@Injectable()
export class VersionService {
  getCurrentVersion() {
    return process.env.CURRENT_VERSION;
  }
  getLastAppUrl() {
    return process.env.APP_URL;
  }
}
