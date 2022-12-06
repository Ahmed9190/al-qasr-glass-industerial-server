import { Controller, Get } from '@nestjs/common';
import { VersionService } from './version.service';

@Controller('version')
export class VersionController {
  constructor(private readonly versionService: VersionService) {}

  @Get('current')
  getCurrentVersion() {
    return this.versionService.getCurrentVersion();
  }

  @Get('app-url')
  getLastAppUrl() {
    return this.versionService.getLastAppUrl();
  }
}
