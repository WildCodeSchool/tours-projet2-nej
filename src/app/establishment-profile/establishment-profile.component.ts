import { Component, OnInit } from '@angular/core';
import { EstablishmentProfileService } from '../common/services/establishment-profile.service';
import { Etablishment } from '../common/models/etablishment.models';
import { EtablishmentService } from '../common/services/etablishment.service';
import { ToastrService } from 'ngx-toastr';
import { BookingService } from '../common/services/booking.service';
import { Booking } from '../common/models/booking.model';
@Component({
  selector: 'app-establishment-profile',
  templateUrl: './establishment-profile.component.html',
  styleUrls: ['./establishment-profile.component.css'],
})
export class EstablishmentProfileComponent implements OnInit {

  public nameOrder: boolean = false;
  public nameUser: boolean = false;
  public dateStart: boolean = false;
  public dateEnd: boolean = false;
  private allMyBookings = [];
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
      },
    );
    this.serviceBook.getAllBookings().subscribe(
      (bookings: Booking[]) => {
        this.allMyBookings = bookings;
        console.log(bookings);
      },
    );
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

  // Trier par noms d'établissements
  public sortName() {
    if (!this.nameOrder) {
      this.allMyBookings.sort((a, b) => {
        this.nameOrder = !this.nameOrder;
        return a.establishment.name.localeCompare(b.establishment.name);
      });
    } else {
      return this.allMyBookings.reverse();
    }
  }

  public sortNameUser() {
    if (!this.nameUser) {
      this.allMyBookings.sort((a, b) => {
        this.nameUser = !this.nameUser;
        return a.owner.name.localeCompare(b.owner.name);
      });
    } else {
      return this.allMyBookings.reverse();
    }
  }

  public sortDateStart() {
    if (!this.dateStart) {
      this.allMyBookings.sort((a, b) => {
        this.dateStart = !this.dateStart;
        return a.date.start.localeCompare(b.date.start);
      });
    } else {
      return this.allMyBookings.reverse();
    }
  }

  public sortDateEnd() {
    if (!this.dateEnd) {
      this.allMyBookings.sort((a, b) => {
        this.dateEnd = !this.dateEnd;
        return a.date.end.localeCompare(b.date.end);
      });
    } else {
      return this.allMyBookings.reverse();
    }
  }
}
