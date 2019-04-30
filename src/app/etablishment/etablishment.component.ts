import { Component, OnInit } from '@angular/core';
import { EtablishmentService } from '../common/services/etablishment.service';
import { FormBuilder, FormGroup, FormArray } from '@angular/forms';
import { Etablishment } from '../common/models/etablishment.models';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-etablishment',
  templateUrl: './etablishment.component.html',
  styleUrls: ['./etablishment.component.css'],
})
export class EtablishmentComponent implements OnInit {
  public id: string ;
  public etablishments: Etablishment;
  // public form: FormGroup;
  constructor(private route: ActivatedRoute,
              private service: EtablishmentService,
              private fb: FormBuilder,
              public router: Router,
              private toastr: ToastrService,
  ) {
  }

  etablishmentForm = this.fb.group({
    type: [''],
    name: [''],
    image: [''],
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

  public ngOnInit(): void {
    // appel les infos de l'API pour l'etablissement séléctioné
    this.route.paramMap.subscribe((params: ParamMap) => {
      this.id = params.get('id');
      if (this.id) {

        this.service.getEtablishment(this.id).subscribe(
          (res: Etablishment) => {
            this.etablishments = res;
            this.etablishmentForm.patchValue(res);

            const medias = this.etablishmentForm.controls.medias as FormArray;

            for (let i = 0; i < res.medias.length; i += 1) {
              this.addMedias();
              medias.at(i).patchValue(res.medias[i]);
            }
            const networks = this.etablishmentForm.controls.networks as FormArray;

            for (let j = 0; j < res.networks.length; j += 1) {
              this.addNetworks();
              networks.at(j).patchValue(res.networks[j]);
            }
          },
        );
      }
    });
  }
  public onSubmit() {
    // si un "id" est renseigné alors la modification est activé
    if (this.id) {
      this.service.putEtablishment(this.id, this.etablishmentForm.value)
        .subscribe((etablishment: Etablishment) => {
          this.etablishmentForm.patchValue(etablishment);
          this.toastr.success("L'établissement a bien été modifié", 'Modification', {
            positionClass: 'toast-bottom-full-width',
          });
        });
      // sinon l'ajout est activé
    } else {
      this.service.postEtablishment(this.etablishmentForm.value)
        .subscribe((etablishment: Etablishment) => {
          this.etablishmentForm.patchValue(etablishment);
          this.toastr.success("L'établissement a bien été créé", 'Création', {
            positionClass: 'toast-bottom-full-width',
          });
        });
    }
  }
  // supprime un etablissement de l'API
  public deleteEtablishment() {
    const result = confirm("Confirmez-vous la suppression de l'établissement' ?");
    if (result) {
      this.service.deleteEtablishment(this.id)
        .subscribe(() => {
          this.router.navigate(['']);
          this.toastr.warning("L'établissement a bien été supprimé", 'Suppression', {
            positionClass: 'toast-bottom-full-width',
          });
        });
    }
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
