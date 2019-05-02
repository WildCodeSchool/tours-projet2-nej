import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { tap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class LoginService {

  public user: boolean;

  constructor(private http: HttpClient) { }
  login(email: string, password: string) {
    return this.http.post<any>(
      `${environment.apiUrl}/auth/signin`, { email, password })

      .pipe(tap((user) => {
        if (user) {
          this.user = true;
          localStorage.setItem('token', user.token);
        }
      }));
  }

  logout() {
    this.user = false;
    localStorage.removeItem('token');
  }
  isLogin() {
    if (localStorage.getItem('token')) {
      return true;
    }
    return false;
  }
}
