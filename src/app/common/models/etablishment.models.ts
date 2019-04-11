export class Etablishment {
  constructor(public name: string,
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
