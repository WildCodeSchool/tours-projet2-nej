import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Injectable } from '@angular/core';
import { LoginService } from '../services/login.service';

@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {

  constructor(private router: Router, public service: LoginService) { }

  canActivate (route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    if (this.service.isLogin()) {
      return true;
    }
    this.router.navigate(['login']);
    return false;
  }
}
