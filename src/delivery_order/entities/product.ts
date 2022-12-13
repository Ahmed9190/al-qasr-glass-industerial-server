import { AfterLoad, Column } from 'typeorm';

export class Product {
  @Column({ name: 'TotQty' })
  quantity: number;

  @Column({ name: 'TotArea' })
  area: number;

  @AfterLoad()
  _assureIntValues() {
    this.quantity = parseInt(this.quantity.toString());
  }
}
