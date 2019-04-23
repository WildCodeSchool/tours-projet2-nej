import { Injectable } from  '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from  'rxjs/operators';
import { Profile } from '../models/profile.model';

@Injectable({ providedIn:  'root' })
export class ProfileService {

  constructor(public http: HttpClient) {}

  public get(): Observable<Profile> {
    const  obs:Observable<any> = this.http.get('https://open-reza.herokuapp.com/api/profiles');

    const  treatment  = (response:any) => {
      return  response as Profile;
    };
    return  obs.pipe(map(treatment));
  }
  public put(profileForm: any): Observable<Profile> {
// tslint:disable-next-line: max-line-length
    const obs: Observable<any> = this.http.put('https://open-reza.herokuapp.com/api/profiles', profileForm);
    const  treatment  = (response:any) => {
      return  response as Profile;
    };
    return  obs.pipe(map(treatment));
  }
}
