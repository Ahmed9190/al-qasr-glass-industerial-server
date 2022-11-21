import { Test, TestingModule } from '@nestjs/testing';
import DeliveryOrderGateway from './delivery_order.gateway';

describe('DeliveryOrderGateway', () => {
  let gateway: DeliveryOrderGateway;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DeliveryOrderGateway],
    }).compile();

    gateway = module.get<DeliveryOrderGateway>(DeliveryOrderGateway);
  });

  it('should be defined', () => {
    expect(gateway).toBeDefined();
  });
});
