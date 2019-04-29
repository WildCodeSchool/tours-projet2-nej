import { Component, OnInit } from '@angular/core';
import { LoginService } from '../common/services/login.service';
import { JwtHelperService } from '@auth0/angular-jwt';
import { ProfileService } from '../common/services/profile.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {

  public name: string;
  navbarOpen = false;

  constructor(public loginService: LoginService,
              public jwtHelper: JwtHelperService,
              public service: ProfileService,
              )
              {}

  ngOnInit() {
    if (this.loginService.isLogin()) {
      this.service.get().subscribe(
        (param) => {
          this.name = param.firstName;
        });
    }
  }

  logout() {
    this.loginService.logout();
  }
  toggleNavbar() {
    this.navbarOpen = !this.navbarOpen;
  }
}
