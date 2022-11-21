import { SmsApiParameters } from './interfaces/sms-api-parameters.interface';
import { SMSData } from './interfaces/sms.interface';

export const smsApiUrl = 'http://REST.GATEWAY.SA/api/SendSMS';
export const buildSmsApiQueryParameters = (
  data: SMSData,
): SmsApiParameters => ({
  api_id: 'API38746421063',
  api_password: '*0s9UD^x13XT$@3!',
  sms_type: 'T',
  encoding: 'T',
  sender_id: 'ALQASRGLASS',
  phonenumber: data.mobile,
  textmessage: data.message,
});

// export const smsUrlBuilder = new UrlBuilder(smsApiUrl);
