import { Component, OnInit } from '@angular/core';
import { EstablishmentProfileService } from '../common/services/establishment-profile.service';
import { Etablishment } from '../common/models/etablishment.models';
import { EtablishmentService } from '../common/services/etablishment.service';
import { ToastrService } from 'ngx-toastr';
import { BookingService } from '../common/services/booking.service';
@Component({
  selector: 'app-establishment-profile',
  templateUrl: './establishment-profile.component.html',
  styleUrls: ['./establishment-profile.component.css'],
})
export class EstablishmentProfileComponent implements OnInit {

  private bookingEstablishmentList = [];
  private myEstablishmentsId = [];
  private myEstablishments = [];
  public establishmentList: any;
  public establishment: boolean = true;
  public bookings: boolean = false;
  constructor(
    private serviceProfEst: EstablishmentProfileService,
    private serviceEst: EtablishmentService,
    private serviceBook: BookingService,
    private toastr: ToastrService,
) {}
  public ngOnInit(): void {
    this.serviceProfEst.get().subscribe(
      (establishment: Etablishment[]) => {
        this.myEstablishments = establishment;
        console.log(establishment);
        for (let i = 0; i < this.myEstablishments.length; i += 1) {
          this.myEstablishmentsId.push(this.myEstablishments[i]._id);
        }
        console.log(this.myEstablishmentsId);
      },
    );
    // for (let i = 0; i < this.myEstablishmentsId.length; i += 1) {
    //   this.serviceBook
    //   .getBookingByEstablishment(this.myEstablishmentsId[i])
    //   .subscribe((bookinglist) => {
    //     console.log(bookinglist);
    //     this.bookingEstablishmentList = this.bookingEstablishmentList.push(bookinglist);
    //   });

    // }
    // console.log(this.bookingEstablishmentList);
  }

  public showEstablishmentOrBookings() {
    this.establishment = !this.establishment;
    this.bookings = !this.bookings;
  }

  public deleteEstablishment(id, index) {
    const result = confirm("Confirmez-vous la suppression de l'établissement ?");
    if (result) {
      this.serviceEst.deleteEtablishment(id).subscribe(() => {
        this.myEstablishments.splice(index, 1);
        this.toastr.warning("L'établissement a bien été supprimé", 'Suppression', {
          positionClass: 'toast-bottom-full-width',
        });
      });
    }
  }

}
