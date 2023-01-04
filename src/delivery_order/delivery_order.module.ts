import { Module } from '@nestjs/common';
import { DeliveryOrderService } from './delivery_order.service';
import { DeliveryOrderController } from './delivery_order.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DeliveryOrder } from './entities/delivery_order.entity';
import { DeliveryOrderGateway } from './delivery_order.gateway';
import { SmsModule } from 'src/sms/sms.module';
import Branch from 'src/core/enums/branch.enum';

@Module({
  imports: [
    TypeOrmModule.forFeature([DeliveryOrder], Branch.jeddah),
    TypeOrmModule.forFeature([DeliveryOrder], Branch.riyadh),
    SmsModule,
  ],
  controllers: [DeliveryOrderController],
  providers: [DeliveryOrderService, DeliveryOrderGateway],
})
export class DeliveryOrderModule {}
