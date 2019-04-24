import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { tap } from  'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class LoginService {

  constructor(private http: HttpClient) {}
  login(email: string, password: string) {
// tslint:disable-next-line: max-line-length
    return this.http.post<any>('https://open-reza.herokuapp.com/api/auth/signin', { email, password })

        .pipe(tap((user) => {
          if (user) {
            localStorage.setItem('token', user.token);
          }
        }));
  }

  logout() {
    localStorage.removeItem('token');
  }
}
