import { Column } from 'typeorm';

export class Customer {
  @Column({ name: 'CustName' })
  name: string;

  @Column({ name: 'Location' })
  location: string;
}
