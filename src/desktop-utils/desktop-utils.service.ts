import { Injectable } from '@nestjs/common';
import { MapsToLatAndLngDto } from './dto/maps-to-lat-and-lng.dto';

@Injectable()
export class DesktopUtilsService {
  mapsToLatAndLng({ url }: MapsToLatAndLngDto) {
    const [lat, long] = this.getLatLongFromGoogleMapsUrl(url);
    return `${lat},${long}`;
  }

  getLatLongFromGoogleMapsUrl(url: string): [string, string] {
    const firstDelimiter = '@';
    const secondDelimiter = ',';
    const [lat, long] = url.split(firstDelimiter)[1].split(secondDelimiter);
    return [lat, long];
  }
}
