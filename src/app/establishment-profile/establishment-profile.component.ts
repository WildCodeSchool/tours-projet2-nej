import { Component, OnInit } from '@angular/core';
import { EstablishmentProfileService } from '../common/services/establishment-profile.service';
import { Etablishment } from '../common/models/etablishment.models';
import { EtablishmentService } from '../common/services/etablishment.service';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-establishment-profile',
  templateUrl: './establishment-profile.component.html',
  styleUrls: ['./establishment-profile.component.css'],
})
export class EstablishmentProfileComponent implements OnInit {

  private establishments = [];
  establishmentList: any;

  constructor(
    private serviceProfEst: EstablishmentProfileService,
    private serviceEst: EtablishmentService,
    private toastr: ToastrService,
) {}
  public ngOnInit(): void {
    this.serviceProfEst.get().subscribe(
      (establishment: Etablishment[]) => {
        this.establishments = establishment;
        console.log(establishment);
      },
    );
  }

  public deleteEstablishment(id, index) {
    const result = confirm("Confirmez-vous la suppression de l'établissement ?");
    if (result) {
      this.serviceEst.deleteEtablishment(id).subscribe(() => {
        this.establishments.splice(index, 1);
        this.toastr.warning("L'établissement a bien été supprimé", 'Suppression', {
          positionClass: 'toast-bottom-full-width',
        });
      });
    }
  }
}
