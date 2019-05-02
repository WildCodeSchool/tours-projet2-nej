import { Injectable } from '@angular/core';
import { Etablishment } from '../models/etablishment.models';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
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
      `${environment.apiUrl}/establishments/${id}`);
    return obs.pipe(
      map((paramEtablishment: any) => {
        return paramEtablishment as Etablishment;
      }),
    );
  }
  // crée un etablissment
  public postEtablishment(etablishementForm: any): Observable<Etablishment> {
    const obs: Observable<any> = this.service.post(
      `${environment.apiUrl}/establishments`, etablishementForm);

    return obs.pipe(
      map((paramEtablishment: any) => {
        return paramEtablishment as Etablishment;
      }),
    );
  }

  public putEtablishment(id: string, etablishementForm: any): Observable<Etablishment> {
    const obs: Observable<any> = this.service.put(
      `${environment.apiUrl}/establishments/${id}`, etablishementForm);

    return obs.pipe(map((paramEtablishment: any) => {
      return paramEtablishment as Etablishment;
    }),
    );
  }
  public deleteEtablishment(id: string): Observable<any> {
    return this.service.delete(
      `${environment.apiUrl}/establishments/${id}`);

  }

  public getAllEtablishment(): Observable<Etablishment[]> {
    const obs: Observable<any> = this.service.get(
      `${environment.apiUrl}/establishments/`);

    return obs.pipe(
      map((paramEtablishment: any) => {
        return paramEtablishment as Etablishment[];
      }),
    );
  }

  public searchedEtablishment(type:string, word:string): Observable<Etablishment[]> {
    let url = `${environment.apiUrl}/establishments/search?`;
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
      `${environment.apiUrl}/establishments/`);

    return obs.pipe(
      map((paramEtablishment: any) => {
        return paramEtablishment as Etablishment[];
      }),
    );
  }
}
