import { Component, OnInit } from '@angular/core';
import { EtablishmentService } from '../common/services/etablishment.service';
import { FormBuilder } from '@angular/forms';
import { Etablishment } from '../common/models/etablishment.models';
import { ActivatedRoute, ParamMap } from '@angular/router';
@Component({
  selector: 'app-etablishment',
  templateUrl: './etablishment.component.html',
  styleUrls: ['./etablishment.component.css'],
})
export class EtablishmentComponent implements OnInit {
  public id: string;
  public etablishments: Etablishment;
  constructor(private route: ActivatedRoute, private service: EtablishmentService,
              private fb: FormBuilder) { }
  etablishmentForm = this.fb.group({
    name: [''],
    profile: [''],
    description: [''],
    address: this.fb.group({
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
    medias: this.fb.group({
      url: [''],
      order: [''],
    }),
  });

  public onSubmit() {
    console.log(this.etablishmentForm.value);

    this.route.paramMap.subscribe((params: ParamMap) => {
      const id = params.get('id');

      if (id) {
        this.service.putEtablishment(id, this.etablishmentForm.value)
        .subscribe((etablishment: Etablishment) => {
          this.etablishmentForm.patchValue(etablishment);
        });
      }else {
        this.service.postEtablishment(this.etablishmentForm.value)
      .subscribe((etablishment: Etablishment) => {
        this.etablishmentForm.patchValue(etablishment);
      });
      }
    });
  }

  public ngOnInit(): void {

    this.route.paramMap.subscribe((params: ParamMap) => {
      const id = params.get('id');

      if (id) {
        this.service.getEtablishment(id).subscribe(
          (res: Etablishment) => {
            this.etablishments = res;
            this.etablishmentForm.patchValue(res);
          },
        );
      }

    });
  }
}
