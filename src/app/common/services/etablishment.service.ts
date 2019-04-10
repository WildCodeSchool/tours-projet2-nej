import { Injectable } from '@angular/core';
import { Etablishment } from '../models/etablishment.models';

@Injectable({
  providedIn: 'root',
})
export class EtablishmentService {
  etablishement:Etablishment;
  etablishements: Etablishment[];
  constructor() { }
  getetablishements(): Etablishment[] {
  // Récupération des etablissement en format 'string'
    return this.etablishements;
  }
}
