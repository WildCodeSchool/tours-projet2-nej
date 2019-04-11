import { Injectable } from  '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from  'rxjs/operators';
import { Profile } from '../models/profile.model';

@Injectable({ providedIn:  'root' })
export class ProfileService {

  constructor(public http: HttpClient) {}

  public getMyProfiles(): Observable<Profile> {
    const  obs1:Observable<any> = this.http.get('https://open-reza.herokuapp.com/profil');

    const  treatment  = (response:any) => {
      return  response as Profile;
    };
    return  obs1.pipe(map(treatment));
  }

}
