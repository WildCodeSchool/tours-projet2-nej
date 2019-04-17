import { Injectable } from '@angular/core';
import { Etablishment } from '../models/etablishment.models';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
@Injectable({
  providedIn: 'root',
})
export class EtablishmentService {
  getBookingListEstablishment(id: string) {
    throw new Error("Method not implemented.");
  }
  etablishement: Etablishment;
  private service: HttpClient;
  // tslint:disable-next-line: variable-name
  constructor(paramService: HttpClient) {
    this.service = paramService;
  }
  public getEtablishment(id:string): Observable<Etablishment> {
    const obs1: Observable<any> = this.service.get(
      `http://open-reza.herokuapp.com:80/api/establishments/${id}`);

    return obs1.pipe(
      map((paramEtablishment: any) => {
        return paramEtablishment as Etablishment;
      }),
    );
  }
}
