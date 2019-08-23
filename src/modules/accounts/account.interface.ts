import { Document } from 'mongoose';

export enum AccessType {
  PaymentInitiation = 'PaymentInitiation',
  AccountInformation = 'AccountInformation',
  PaymentInitiationAndAccountInformation = 'PaymentInitiationAndAccountInformation',
}

export interface Access {
  [appID: string]: {
    authorizationDate: number;
    accessType: AccessType;
  };
}

export interface AccountInterface extends Document {
  readonly accountID: number;

  readonly currency: string;

  readonly bookingBalance: number;
  readonly availableBalance: number;

  readonly accountNumber: string;

  readonly accountTypeDescription: string;
  readonly accountTypeCode: string;
  readonly accountTypeName: string;

  readonly accountNameClient: string;

  // Internal properties

  readonly accesses: Access;
}