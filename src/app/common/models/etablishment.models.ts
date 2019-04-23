import { Url } from 'url';

export class Etablishment {
  constructor(public type: string, public name: string, public image: Url,
              public address: {
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
