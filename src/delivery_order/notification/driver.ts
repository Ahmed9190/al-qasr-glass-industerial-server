import { DriverObserver } from './driver_observer';
import { Socket } from 'socket.io';
import { DeliveryOrder } from '../entities/delivery_order.entity';

export class Driver implements DriverObserver {
  readonly number: number;
  readonly socket: Socket;

  constructor(number: number, socketClient: Socket) {
    this.number = number;
    this.socket = socketClient;
  }

  sendNotification(eventName: string, deliveryOrder: DeliveryOrder) {
    this.socket.emit(eventName, deliveryOrder);
  }
}
