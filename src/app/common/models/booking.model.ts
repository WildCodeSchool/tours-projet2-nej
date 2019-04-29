import { Etablishment } from './etablishment.models';

export class Booking {
  constructor(
    public date: {
      start: Date;
      end: Date;
    },
    public owner: {
      name: string;
      address: {
        street: string;
        zipCode: string;
        city: string;
        number: Number;
      };
      contact: {
        phone: string;
        email: string;
      };
    },
    public numbers: Number,
    public establishment: Etablishment | string,
  ) {}
}
