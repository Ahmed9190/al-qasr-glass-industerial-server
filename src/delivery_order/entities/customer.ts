import { AfterLoad, Column } from 'typeorm';
import { Location } from './location';

export class Customer {
  @Column({ name: 'CustName' })
  name: string;

  @Column({ name: 'Location' })
  private _location: string;

  location: Location;
  @AfterLoad()
  private getLocation() {
    const [latitude, longitude] = this._location.split(',');
    this.location = { latitude: +latitude, longitude: +longitude };

    delete this._location;
  }
}
