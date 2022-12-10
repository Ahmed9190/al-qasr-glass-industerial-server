import { Module } from '@nestjs/common';
import { DesktopUtilsService } from './desktop-utils.service';
import { DesktopUtilsController } from './desktop-utils.controller';

@Module({
  controllers: [DesktopUtilsController],
  providers: [DesktopUtilsService]
})
export class DesktopUtilsModule {}
