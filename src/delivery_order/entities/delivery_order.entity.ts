import { IsInt, Min, Max } from 'class-validator';
import { AfterLoad, Column, Entity, JoinColumn, OneToOne } from 'typeorm';
import { DeliveryOrderStatus } from '../enums/delivery-order-status.enum';
import { Car } from './car.entity';
import { Customer } from './customer';
import { Product } from './product';

@Entity('DeliveryOrderH')
export class DeliveryOrder {
  @Column({ name: 'invno', primary: true })
  number: number;

  @Column({ name: 'invdate', type: 'date' })
  date: Date;

  @Column({ name: 'CarOutDate', type: 'datetime' })
  carLeavingAppointment: Date;

  @Column({ name: 'SOinvno', type: 'int' })
  sellOrder: number;

  @OneToOne(() => Car, { eager: true })
  @JoinColumn({ name: 'CarCode', referencedColumnName: 'number' })
  car: Car;

  @Column(() => Customer, { prefix: false })
  customer: Customer;

  @Column(() => Product, { prefix: false })
  product: Product;

  @Column({ name: 'Driver' })
  driverNumber: number;

  @IsInt()
  @Min(1000)
  @Max(9999)
  @Column({ select: false })
  verificationCode: number;

  @Column({ default: false })
  delivered: boolean;

  @Column({ name: 'seen', default: false })
  seen: boolean;

  @Column({ name: 'CustRecDate', type: 'datetime', select: false })
  deliveredAt: Date;

  @Column({ name: 'GatePass', enum: DeliveryOrderStatus })
  status: number;

  @AfterLoad()
  _assureIntValues() {
    this.sellOrder = parseInt(this.sellOrder.toString());
  }
}
