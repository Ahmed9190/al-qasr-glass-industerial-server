import { SmsApiParameters } from './interfaces/sms-api-parameters.interface';
import { SMSData } from './interfaces/sms.interface';

export const smsApiUrl = 'http://REST.GATEWAY.SA/api/SendSMS';
export const buildSmsApiQueryParameters = (
  data: SMSData,
): SmsApiParameters => ({
  templateid: +process.env.VERIFICATION_SMS_TEMPLATE_ID,
  api_id: process.env.SMS_API_ID,
  api_password: process.env.SMS_API_PASSWORD,
  sms_type: 'T',
  encoding: 'T',
  sender_id: data.sender_id ?? process.env.SMS_SENDER_ID,
  phonenumber: data.mobile,
  V1: data.deliveryOrderNumber,
  V2: data.verificationCode,
});
