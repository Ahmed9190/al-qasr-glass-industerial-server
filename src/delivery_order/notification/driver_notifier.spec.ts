import { Driver } from './driver';
import { DriversNotifier } from './driver_notifier';

describe('DeliveryOrderController', () => {
  let driversNotifier: DriversNotifier;

  beforeEach(() => {
    driversNotifier = new DriversNotifier();
  });

  describe('registerObserver', () => {
    it('should increase length of drivers array by one when a driver passed', () => {
      // arrange
      const driverObserver: Driver = new Driver(1);
      // act
      driversNotifier.registerObserver(driverObserver);
      // assert
      expect(driversNotifier.drivers.length).toBe(1);
    });
  });

  describe('removeObserver', () => {
    it('should decrease length of drivers array by one when a driver passed', () => {
      // arrange
      const driverObserver: Driver = new Driver(1);
      driversNotifier.drivers = [driverObserver];
      // act
      driversNotifier.removeObserver(driverObserver);
      // assert
      expect(driversNotifier.drivers.length).toBe(0);
    });
  });
});
