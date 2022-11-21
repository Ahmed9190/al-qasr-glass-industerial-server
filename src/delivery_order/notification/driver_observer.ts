import { Socket } from 'socket.io';

export interface DriverObserver {
  number: number;

  sendNotification(eventName: string, dataToSend: Object): void;
}
