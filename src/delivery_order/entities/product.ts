import { Column } from 'typeorm';

export class Product {
  @Column({
    name: 'TotQty',
    type: 'int',
    transformer: {
      from: (quantity: number) => +quantity.toFixed(0),
      to: (quantity: number) => quantity,
    },
  })
  quantity: number;

  @Column({
    name: 'TotArea',
    type: 'float',
    transformer: {
      from: (area: number) => +area.toFixed(2),
      to: (area: number) => area,
    },
  })
  area: number;
}
