import { Column, Entity, OneToOne } from 'typeorm';
import { DeliveryOrder } from './delivery_order.entity';

@Entity('Cars')
export class Car {
  @Column({ name: 'Carno', primary: true, select: false })
  id: number;

  //TODO: don't forget to make the same type for flutter model
  @Column({ name: 'CarCode', type: 'nvarchar' })
  number: string;

  @Column({ name: 'CarName', type: 'nvarchar' })
  model: string;

  @OneToOne(() => DeliveryOrder, (deliveryOrder) => deliveryOrder.car)
  deliveryOrder: DeliveryOrder;
}
