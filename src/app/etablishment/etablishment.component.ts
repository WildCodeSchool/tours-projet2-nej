import { Component, OnInit } from '@angular/core';
import { EtablishmentService } from '../common/services/etablishment.service';
import { FormBuilder, FormGroup, FormArray } from '@angular/forms';
import { Etablishment } from '../common/models/etablishment.models';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
@Component({
  selector: 'app-etablishment',
  templateUrl: './etablishment.component.html',
  styleUrls: ['./etablishment.component.css'],
})
export class EtablishmentComponent implements OnInit {
  public id: string;
  public etablishments: Etablishment;
  // public form: FormGroup;
  constructor(private route: ActivatedRoute, private service: EtablishmentService,
              private fb: FormBuilder, public router: Router) {
  }

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
    networks: this.fb.array([]),
    medias: this.fb.array([]),
  });

  public onSubmit() {
    console.log(this.etablishmentForm.value);
    // ajout ou modification de l'etablissement dans l'API
    this.route.paramMap.subscribe((params: ParamMap) => {
      const id = params.get('id');
// si un "id" est renseigné alors la modification est activé
      if (id) {
        this.service.putEtablishment(id, this.etablishmentForm.value)
          .subscribe((etablishment: Etablishment) => {
            this.etablishmentForm.patchValue(etablishment);
          });
          // sinon l'ajout est activé
      } else {
        this.service.postEtablishment(this.etablishmentForm.value)
          .subscribe((etablishment: Etablishment) => {
            this.etablishmentForm.patchValue(etablishment);
          });
      }
    });
  }
  // supprime un etablissement de l'API
  public deleteEtablishment() {
    this.route.paramMap.subscribe((params: ParamMap) => {
      const id = params.get('id');
      this.service.deleteEtablishment(id)
        .subscribe(() => {
          this.router.navigate(['']);
        });
    });
  }

  public ngOnInit(): void {
      // appel les infos de l'API pour l'etablissement séléctioné
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
  // tableau des networks
  public addNetworks() {
    const networks = this.etablishmentForm.controls.networks as FormArray;
    networks.push(this.fb.group({
      name: '',
      link: '',
    }));
  }
  // tableau des medias
  public addMedias() {
    const medias = this.etablishmentForm.controls.medias as FormArray;
    medias.push(this.fb.group({
      url: '',
      order: '',
    }));
  }
  public deleteNetworks(index) {
    const form = this.etablishmentForm.get('networks') as FormArray;
    form.removeAt(index);
  }
  public deleteMedias(index) {
    const form = this.etablishmentForm.get('medias') as FormArray;
    form.removeAt(index);
  }
}
