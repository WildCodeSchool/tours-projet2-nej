import { Injectable } from '@angular/core';
import { Etablishment } from '../models/etablishment.models';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
@Injectable({
  providedIn: 'root',
})
export class EtablishmentService {
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
  // crée un etablissment
  public postEtablishment(etablishementForm: any): Observable<Etablishment> {
    const obs2: Observable<any> = this.service.post(
      'http://open-reza.herokuapp.com/api/establishments', etablishementForm);

    return obs2.pipe(
      map((paramEtablishment: any) => {
        return paramEtablishment as Etablishment;
      }),
    );
  }
  public putEtablishment(id: string, etablishementForm: any): Observable<Etablishment> {
    const obs3: Observable<any> = this.service.put(
      `http://open-reza.herokuapp.com/api/establishments/${id}`, etablishementForm);

    return obs3.pipe(map((paramEtablishment: any) => {
      return paramEtablishment as Etablishment;
    }),
    );
  }
  public deleteEtablishment(id: string): Observable<any> {
    return this.service.delete(
      `http://open-reza.herokuapp.com/api/establishments/${id}`);

  }
}