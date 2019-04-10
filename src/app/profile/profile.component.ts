import { Component, OnInit } from '@angular/core';
import { Profile } from '../common/models/profile.model';
import { ProfileService } from '../common/services/profile.service';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
})
export class ProfileComponent implements OnInit {
  profileForm = new FormGroup({
    firstName: new FormControl(''),
    lastName: new FormControl(''),
    siret: new FormControl(''),
    siren: new FormControl(''),
    key: new FormControl(''),
    address: new FormGroup({
      street: new FormControl(''),
      zipCode: new FormControl(''),
      city: new FormControl(''),
      number: new FormControl(''),
    }),
    contact: new FormGroup({
      fax: new FormControl(''),
      phone: new FormControl(''),
      email: new FormControl(''),
    }),
  });

  constructor() {

  }

  ngOnInit() {

  }

}
