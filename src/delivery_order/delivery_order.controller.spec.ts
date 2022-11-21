import { Test, TestingModule } from '@nestjs/testing';
import { DeliveryOrderController } from './delivery_order.controller';
import { DeliveryOrderService } from './delivery_order.service';

describe('DeliveryOrderController', () => {
  let controller: DeliveryOrderController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [DeliveryOrderController],
      providers: [DeliveryOrderService],
    }).compile();

    controller = module.get<DeliveryOrderController>(DeliveryOrderController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
