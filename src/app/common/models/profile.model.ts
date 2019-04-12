export class Profile {

  constructor(
    public firstName: string,
    public lastName: string,
    public siret: number,
    public siren: number,
    public key: string,
    public address: {
      street: string,
      zipCode: number,
      city: string,
      number: number,
    },
    public contact: {
      fax: number,
      phone: number,
      email: string,
    },
  ) {}
}
