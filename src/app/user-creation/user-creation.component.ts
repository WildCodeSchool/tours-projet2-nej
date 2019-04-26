import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Profile } from '../common/models/profile.model';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-user-creation',
  templateUrl: './user-creation.component.html',
  styleUrls: ['./user-creation.component.css'],
})
export class UserCreationComponent implements OnInit {
  public profiles: Profile;

  constructor(private route: ActivatedRoute, private router: Router, private fb: FormBuilder) { }
  userCreationForm = this.fb.group({
    firstName:[''],
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
      phone: [''],
      email: [''],
      fax: [''],
    }),
  });

  ngOnInit() {
  }
}
