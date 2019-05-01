import { Component, OnInit } from '@angular/core';
import { Profile } from '../common/models/profile.model';
import { ProfileService } from '../common/services/profile.service';
import { FormBuilder } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { LoginService } from '../common/services/login.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
})
export class ProfileComponent implements OnInit {

  constructor(private service: ProfileService,
              public loginService: LoginService,
              private fb: FormBuilder,
              private router: Router,
              public toastr: ToastrService) {}

  clickMessage = '';

  profileForm = this.fb.group({

    firstName: [''],
    lastName: [''],
    siret: [''],
    siren: [''],
    key: [''],

    address: this.fb.group({
      street: [''],
      zipCode: [''],
      city: [''],
      number: [''],
    }),

    contact: this.fb.group({
      fax: [''],
      phone: [''],
      email: [''],
    }),
  });

  public ngOnInit(): void {

    this.service.get().subscribe(
      (profile: Profile) => {
        this.profileForm.patchValue(profile);
      },
    );
  }
  onClick() {
    if (this.loginService.isLogin()) {
      this.router.navigate(['']);
    }
    this.router.navigate(['userAccount']);
  }

  onSubmit() {

    this.service.put(this.profileForm.value).subscribe(
      (profile: Profile) => {
        this.profileForm.patchValue(profile);
        this.toastr.success('Mon profil a bien été mis à jour!', 'Modification', {
          positionClass: 'toast-bottom-full-width',
        },
    );
      });
  }}
