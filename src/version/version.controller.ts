import { Controller, Get, Headers } from '@nestjs/common';
import { VersionService } from './version.service';
import Branch from 'src/core/enums/branch.enum';

@Controller('version')
export class VersionController {
  constructor(private readonly versionService: VersionService) {}

  @Get('current')
  getCurrentVersion(): string {
    return this.versionService.getCurrentVersion();
  }

  @Get('app-url')
  getLastAppUrl(@Headers('branch') branch: Branch): string {
    return this.versionService.getLastAppUrl(branch);
  }
}
