import { DriverObserver } from './driver_observer';

export interface DriversNotifier {
  drivers: DriverObserver[];

  registerObserver(driver: DriverObserver): void;
  removeObserver(driverToBeRemoved: DriverObserver): void;
  notifyObserver(driverNumber: number, data: Object): void;
}

export class DriversNotifier implements DriversNotifier {
  drivers: DriverObserver[] = [];

  registerObserver(driver: DriverObserver): void {
    this.drivers.push(driver);
  }

  removeObserver(driverToBeRemoved: DriverObserver): void {
    const driverToBeRemovedIndex = this.drivers.findIndex(
      (driver) => driver.number === driverToBeRemoved.number,
    );

    this.drivers.splice(driverToBeRemovedIndex, 1);
  }

  notifyObserver(driverNumber: number, data: Object): void {
    const driver: DriverObserver | undefined = this.drivers.find(
      (driver) => driver.number === driverNumber,
    );

    if (driver) {
      driver.sendNotification('server:delivery_order_created', data);
    }
  }
}

// // while connecting
// const driversNotifier = new DriversNotifier();

// const driver1 = new Driver(1);
// driversNotifier.registerObserver(driver1);

// // when new order is created
// driversNotifier.notifyObserver(1);
// driversNotifier.notifyObserver(2);
