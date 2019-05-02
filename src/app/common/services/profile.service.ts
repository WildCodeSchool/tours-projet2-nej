import { Injectable } from  '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from  'rxjs/operators';
import { Profile } from '../models/profile.model';
import { environment } from 'src/environments/environment'

@Injectable({ providedIn:  'root' })
export class ProfileService {

  constructor(public http: HttpClient) {}

  public get(): Observable<Profile> {
    const  obs:Observable<any> = this.http.get(`${environment.apiUrl}/profiles`);

    const  treatment  = (response:any) => {
      return  response as Profile;
    };
    return  obs.pipe(map(treatment));
  }
  public put(profileForm: any): Observable<Profile> {

    const obs: Observable<any> = this.http.put(
      `${environment.apiUrl}/profiles`, profileForm);
    const  treatment  = (response:any) => {
      return  response as Profile;
    };
    return  obs.pipe(map(treatment));
  }
}
