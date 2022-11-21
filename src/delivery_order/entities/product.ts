import { Column } from 'typeorm';

export class Product {
  @Column({ name: 'TotQty' })
  quantity: number;

  @Column({ name: 'TotArea' })
  area: number;
}
