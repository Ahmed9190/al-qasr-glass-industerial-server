import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { SMSData } from './interfaces/sms.interface';
import { buildSmsApiQueryParameters, smsApiUrl } from './sms.constants';

@Injectable()
export class SmsService {
  constructor(private readonly httpService: HttpService) {}

  public async send(smsData: SMSData): Promise<any> {
    const smsApiQueryParameters = buildSmsApiQueryParameters(smsData);

    const { data } = await this.httpService.axiosRef.get(smsApiUrl, {
      params: smsApiQueryParameters,
    });

    return data.Code == 200;
  }
}
