import { Module } from '@nestjs/common';
import { AuthController } from './auth/auth.controller';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { DeliveryOrderModule } from './delivery_order/delivery_order.module';
import { SmsModule } from './sms/sms.module';
import { ConfigModule } from '@nestjs/config';
import { VersionModule } from './version/version.module';
import { getDatabaseProviders } from './database/database-connection';

@Module({
  imports: [
    ConfigModule.forRoot(),
    ...getDatabaseProviders(),
    AuthModule,
    UsersModule,
    DeliveryOrderModule,
    SmsModule,
    VersionModule,
  ],
  controllers: [AuthController],
})
export class AppModule {}
