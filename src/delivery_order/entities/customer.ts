import { regEx } from 'src/core/constants/regex.constants';
import { Column } from 'typeorm';

export class Customer {
  @Column({ name: 'CustName' })
  name: string;

  @Column({ name: 'Location' })
  location?: string;

  @Column({
    name: 'Mobileno',
    type: 'numeric',
    transformer: {
      from: (mobileNumber?: number) => {
        if (
          mobileNumber != null &&
          regEx.startsWithFiveThen8Digits.test(mobileNumber.toFixed(0))
        ) {
          return `+966${mobileNumber}`;
        }
      },
      to: (mobileNumber?: string) => {
        if (mobileNumber?.includes('966')) {
          return mobileNumber.split('966')[1];
        } else if (mobileNumber?.startsWith('5')) {
          return mobileNumber;
        }
      },
    },
  })
  mobileNumber?: string;
}
