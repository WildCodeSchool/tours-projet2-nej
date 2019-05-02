import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Etablishment } from '../models/etablishment.models';
import { environment } from 'src/environments/environment';

@Injectable({ providedIn: 'root' })
export class EstablishmentProfileService {

  constructor(private http: HttpClient) { }
  public get(): Observable<Etablishment[]> {
    const obs: Observable<any> = this.http
      .get(`${environment.apiUrl}/profiles/establishments`);

    const treatment = (response: any) => {
      return response as Etablishment[];
    };
    return obs.pipe(map(treatment));
  }
}
