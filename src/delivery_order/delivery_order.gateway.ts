import {
  OnGatewayConnection,
  OnGatewayDisconnect,
  WebSocketGateway,
} from '@nestjs/websockets';
import { Socket } from 'socket.io';
import { DriversNotifier } from './notification/driver_notifier';
import { JwtPayload } from '../auth/interfaces/jwt_payload';
import * as jwt from 'jsonwebtoken';
import { Driver } from './notification/driver';

@WebSocketGateway({ cors: true })
export class DeliveryOrderGateway
  implements OnGatewayConnection, OnGatewayDisconnect
{
  readonly driversNotifier: DriversNotifier = new DriversNotifier();

  handleConnection(client: Socket, ...args: any[]) {
    const driverNumber = this.getDriverNumberFromSocket(client);
    const connectedDriver = new Driver(driverNumber, client);
    this.driversNotifier.registerObserver(connectedDriver);
  }

  handleDisconnect(socketClient: Socket) {
    const driverNumber = this.getDriverNumberFromSocket(socketClient);
    const disconnectedDriver = new Driver(driverNumber, socketClient);
    this.driversNotifier.removeObserver(disconnectedDriver);
  }

  private getDriverNumberFromSocket(client: Socket): number {
    const token = client.handshake.headers.token as string;
    const jwtPayload: JwtPayload = jwt.decode(token) as JwtPayload;
    return jwtPayload?.driverNumber;
  }
}
