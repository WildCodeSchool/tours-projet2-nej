export class Establishment {
  constructor(public name: string, public img: string, public price: number,
              public type: String,
              public adress: {
                street: string,
                zipCode: string,
                city: String,
                number: String,
              },
              public description: String,
              public contact: {
                phone: Number,
                email: String,
                site: String,
              },
              public networks: [{
                name: String,
                link: String,
              }],
              public medias: [{
                url: String,
                order: Number,
              }],
              public profile: String,
) { }
}
