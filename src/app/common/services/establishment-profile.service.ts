import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Etablishment } from '../models/etablishment.models';

@Injectable({ providedIn: 'root' })
export class EstablishmentProfileService {

  constructor(private http: HttpClient) {}
  public get(): Observable<Etablishment[]> {
// tslint:disable-next-line: max-line-length
    const  obs1:Observable<any> = this.http.get('https://open-reza.herokuapp.com/api/profiles/establishments');

    const  treatment  = (response:any) => {
      return  response as Etablishment[];
    };
    return  obs1.pipe(map(treatment));
  }
}
