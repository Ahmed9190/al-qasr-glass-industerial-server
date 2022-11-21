import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { SmsService } from './sms.service';

@Module({
  imports: [
    HttpModule.register({
      timeout: 5000,
      maxRedirects: 5,
    }),
  ],
  exports: [SmsService],
  providers: [SmsService],
})
export class SmsModule {}
