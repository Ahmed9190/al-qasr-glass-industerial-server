import { Body, Controller, Post } from '@nestjs/common';
import { DesktopUtilsService } from './desktop-utils.service';
import { MapsToLatAndLngDto } from './dto/maps-to-lat-and-lng.dto';

@Controller('desktop-utils')
export class DesktopUtilsController {
  constructor(private readonly desktopUtilsService: DesktopUtilsService) {}

  @Post('/maps-to-lat-and-lng')
  mapsToLatAndLng(@Body() mapsToLatAndLngDto: MapsToLatAndLngDto) {
    return this.desktopUtilsService.mapsToLatAndLng(mapsToLatAndLngDto);
  }
}
