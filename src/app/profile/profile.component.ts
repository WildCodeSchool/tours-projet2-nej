import { Component, OnInit } from '@angular/core';
import { Profile } from '../common/models/profile.model';
import { ProfileService } from '../common/services/profile.service';
import { FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
})
export class ProfileComponent implements OnInit {

  constructor(private service: ProfileService, private fb: FormBuilder) {}

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

  onSubmit() {

    this.service.put(this.profileForm.value).subscribe(
      (profile: Profile) => {
        this.profileForm.patchValue(profile);
      },
    );
    this.clickMessage = 'Mon profil a bien été mis à jour!';
  }
}
