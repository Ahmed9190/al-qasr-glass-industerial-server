import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { SMSData } from './interfaces/sms.interface';
import { buildSmsApiQueryParameters, smsApiUrl } from './sms.constants';

enum ISmsApiResponseStatus {
  failed = 'F',
  success = 'S',
}

interface ISmsApiResponse {
  message_id: number;
  status: ISmsApiResponseStatus;
  remarks: string;
  uid: any;
  phonenumber: string;
}

@Injectable()
export class SmsService {
  constructor(private readonly httpService: HttpService) {}

  public async send(smsData: SMSData): Promise<boolean> {
    const smsApiQueryParameters = buildSmsApiQueryParameters(smsData);

    const { data } = await this.httpService.axiosRef.get<ISmsApiResponse>(
      smsApiUrl,
      {
        params: smsApiQueryParameters,
      },
    );

    return data.status == ISmsApiResponseStatus.success;
  }
}
