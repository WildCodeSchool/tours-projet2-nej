import { Component, OnInit } from '@angular/core';
import { LoginService } from '../common/services/login.service';
import { JwtHelperService } from '@auth0/angular-jwt';
import { ProfileService } from '../common/services/profile.service';
import { Profile } from '../common/models/profile.model';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {

  public name: string;

  constructor(public loginService: LoginService,
              public jwtHelper: JwtHelperService,
              public service: ProfileService,
              )
              {}

  ngOnInit() {
    console.log(this.name);
    this.service.get().subscribe(
      (param) => {
        this.name = param.firstName;
      });
  }

  logout() {
    this.loginService.logout();
  }
}
