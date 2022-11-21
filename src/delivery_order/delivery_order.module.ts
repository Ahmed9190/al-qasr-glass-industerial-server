import { Module } from '@nestjs/common';
import { DeliveryOrderService } from './delivery_order.service';
import { DeliveryOrderController } from './delivery_order.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DeliveryOrder } from './entities/delivery_order.entity';
import { DeliveryOrderGateway } from './delivery_order.gateway';
import { SmsModule } from 'src/sms/sms.module';

@Module({
  imports: [TypeOrmModule.forFeature([DeliveryOrder]), SmsModule],
  controllers: [DeliveryOrderController],
  providers: [DeliveryOrderService, DeliveryOrderGateway],
})
export class DeliveryOrderModule {}
