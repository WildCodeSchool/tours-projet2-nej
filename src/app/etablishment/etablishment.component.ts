import { Component, OnInit } from '@angular/core';
import { EtablishmentService } from '../common/services/etablishment.service';
import { FormBuilder } from '@angular/forms';
import { Etablishment } from '../common/models/etablishment.models';

@Component({
  selector: 'app-etablishment',
  templateUrl: './etablishment.component.html',
  styleUrls: ['./etablishment.component.css'],
})
export class EtablishmentComponent implements OnInit {

  constructor(private service: EtablishmentService,  private fb: FormBuilder) { }
  public etablishment: Etablishment;
  public etablishments: Etablishment[];

  etablishmentForm = this.fb.group({
    name: [''],
    img: [''],
    price: [''],
    type: [''],
    profile: [''],
    description: [''],
    adress: this.fb.group({
      street: [''],
      zipCode: [''],
      city: [''],
      number: [''],
    }),
    contact: this.fb.group({
      phone: [''],
      email: [''],
      site: [''],
    }),
    networks: this.fb.group({
      name: [''],
      link: [''],
    }),
    medias:this.fb.group({
      url: [''],
      order:[''],
    }),
  });

  onSubmit() {
    console.log(this.etablishmentForm.value)
  }

  ngOnInit() {

    this.etablishmentForm.valueChanges.subscribe((value) => {
      console.log('Valeurs saisies', value);
    });

    this.service.getetablishements();
  }
}
