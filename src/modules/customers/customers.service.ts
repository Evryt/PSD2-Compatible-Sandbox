import { Injectable, Inject } from '@nestjs/common';
import { CUSTOMER_SCHEMA_PROVIDER } from 'src/utils/constants';
import { Model } from 'mongoose';
import { CustomerInterface } from './customer.interface';

import { SHA256 } from 'sha2';

@Injectable()
export class CustomersService {
  constructor(
    @Inject(CUSTOMER_SCHEMA_PROVIDER)
    private readonly customerModel: Model<CustomerInterface>,
  ) {}

  async create(rawCustomer: {
    name: string;
    surname: string;
    address: string;
    clientID: string;
    passwordHash: string;
  }) {
    rawCustomer.passwordHash = SHA256(rawCustomer.passwordHash).toString('hex');
    await new this.customerModel(rawCustomer).save();
  }

  async getByClientID(clientID: string): Promise<CustomerInterface> {
    return await this.customerModel.findOne({ clientID });
  }
}