import { Injectable } from '@angular/core';
import { Establishment } from '../models/etablishment.models';

@Injectable({
  providedIn: 'root',
})
export class EtablishmentService {
  establishement:Establishment;
  establishements: Establishment[];
  constructor() { }
  getestablishements(): Establishment[] {
  // Récupération des etablissement en format 'string'
    return this.establishements;
  }
}
