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

  constructor(paramService: HttpClient) {
    this.service = paramService;
  }
  // afiche un etablissement
  public getEtablishment(id: string): Observable<Etablishment> {
    const obs: Observable<any> = this.service.get(
      `http://open-reza.herokuapp.com/api/establishments/${id}`);
    return obs.pipe(
      map((paramEtablishment: any) => {
        return paramEtablishment as Etablishment;
      }),
    );
  }
  // crée un etablissment
  public postEtablishment(etablishementForm: any): Observable<Etablishment> {
    const obs: Observable<any> = this.service.post(
      'http://open-reza.herokuapp.com/api/establishments', etablishementForm);

    return obs.pipe(
      map((paramEtablishment: any) => {
        return paramEtablishment as Etablishment;
      }),
    );
  }

  public putEtablishment(id: string, etablishementForm: any): Observable<Etablishment> {
    const obs: Observable<any> = this.service.put(
      `http://open-reza.herokuapp.com/api/establishments/${id}`, etablishementForm);

    return obs.pipe(map((paramEtablishment: any) => {
      return paramEtablishment as Etablishment;
    }),
    );
  }
  public deleteEtablishment(id: string): Observable<any> {
    return this.service.delete(
      `http://open-reza.herokuapp.com/api/establishments/${id}`);

  }

  public getAllEtablishment(): Observable<Etablishment[]> {
    const obs: Observable<any> = this.service.get(
      'http://open-reza.herokuapp.com:80/api/establishments/');

    return obs.pipe(
      map((paramEtablishment: any) => {
        return paramEtablishment as Etablishment[];
      }),
    );
  }

  public searchedEtablishment(type:string, word:string): Observable<Etablishment[]> {
    let url = 'http://open-reza.herokuapp.com:80/api/establishments/search?';
    if (type || word) {
      if (type) {
        url = `${url}&type=${type}`;
      }
      if (word) {
        url = `${url}&name=${word}`;
      }
      return this.service.get(url).pipe(
        map((searchedEstablishment: any) => {
          return searchedEstablishment as Etablishment[];
        }),
      );
    }
    const obs: Observable<any> = this.service.get(
      'http://open-reza.herokuapp.com:80/api/establishments/');

    return obs.pipe(
      map((paramEtablishment: any) => {
        return paramEtablishment as Etablishment[];
      }),
    );
  }
}
