import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { EtablishmentService } from '../common/services/etablishment.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Etablishment } from '../common/models/etablishment.models';
import { ToastrService } from 'ngx-toastr';
import { __importDefault } from 'tslib';
import { EstablishmentProfileService } from '../common/services/establishment-profile.service';

@Component({
  selector: 'app-establishment-card',
  templateUrl: './establishment-card.component.html',
  styleUrls: ['./establishment-card.component.css'],
})
export class EstablishmentCardComponent implements OnInit {

  @Input() public establishment: Etablishment;
  @Input() public admin: boolean;
  @Output() public delete: EventEmitter<any> = new EventEmitter();

  constructor(
    private serviceEstablishment: EtablishmentService,
    private modalService: NgbModal,
    private toastr: ToastrService,
    private profileEstablishmentService: EstablishmentProfileService,
    ) {}

  ngOnInit() {
    console.log(this.establishment);
  }

  // Modale
  public open(content) {
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' });
  }

  public deleteEstablishment(id: any, index: any) {
    const result = confirm("Confirmez-vous la suppression de l'établissement ?");
    if (result) {
      this.serviceEstablishment.deleteEtablishment(id).subscribe(() => {
        this.delete.emit(index);
        this.toastr.warning("L'établissement a bien été supprimé", 'Suppression', {
          positionClass: 'toast-bottom-full-width',
        });
      });
    }
  }

}
