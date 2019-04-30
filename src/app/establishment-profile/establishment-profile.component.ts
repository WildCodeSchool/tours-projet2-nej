import { Component, OnInit, Output } from '@angular/core';
import { EstablishmentProfileService } from '../common/services/establishment-profile.service';
import { Etablishment } from '../common/models/etablishment.models';
import { EtablishmentService } from '../common/services/etablishment.service';
import { ToastrService } from 'ngx-toastr';
import { BookingService } from '../common/services/booking.service';
import { Booking } from '../common/models/booking.model';
import { ProfileService } from '../common/services/profile.service';
@Component({
  selector: 'app-establishment-profile',
  templateUrl: './establishment-profile.component.html',
  styleUrls: ['./establishment-profile.component.css'],
})
export class EstablishmentProfileComponent implements OnInit {

  public isNameOrder: boolean = false;
  public isNameUser: boolean = false;
  public isDateStart: boolean = false;
  public isDateEnd: boolean = false;
  private bookings: Booking[];
  public isEstablishmentShow: boolean = true;
  public isBookingsShow: boolean = false;
  public myEstablishments: Etablishment[];

  constructor(
    private serviceBooking: BookingService,
    private toastr: ToastrService,
    private profileEstablishmentService: EstablishmentProfileService,
) {}

  public ngOnInit(): void {
    this.serviceBooking.getAllBookings().subscribe(
      (bookings: Booking[]) => {
        this.bookings = bookings;

      },
    );
    this.profileEstablishmentService.get().subscribe((myEstablishments) => {
      this.myEstablishments = myEstablishments;
    });
  }

  public showEstablishments() {
    this.isEstablishmentShow = true;
    this.isBookingsShow = false;
  }

  public showBookings() {
    this.isEstablishmentShow = false;
    this.isBookingsShow = true;
    console.log(this.isBookingsShow);
  }

  // Trier par noms d'établissements
  public sortName() {
    if (!this.isNameOrder) {
      this.bookings.sort((a, b) => {
        this.isNameOrder = !this.isNameOrder;
        a.establishment = a.establishment as Etablishment;
        b.establishment = b.establishment as Etablishment;
        return a.establishment.name.localeCompare(b.establishment.name);
      });
    } else {
      this.isNameUser = false;
      this.isDateStart = false;
      this.isDateEnd = false;
      return this.bookings.reverse();
    }
  }

  public sortNameUser() {
    if (!this.isNameUser) {
      this.bookings.sort((a, b) => {
        this.isNameUser = !this.isNameUser;
        return a.owner.name.localeCompare(b.owner.name);
      });
    } else {
      this.isNameOrder = false;
      this.isDateStart = false;
      this.isDateEnd = false;
      return this.bookings.reverse();
    }
  }

  public sortDateStart() {
    if (!this.isDateStart) {
      this.bookings.sort((a, b) => {
        this.isDateStart = !this.isDateStart;
        return new Date(a.date.start).getTime() - new Date(b.date.start).getTime();
      });
    } else {
      this.isNameOrder = false;
      this.isNameUser = false;
      this.isDateEnd = false;
      return this.bookings.reverse();
    }
  }

  public deleteBooking(id, index) {
    const result = confirm('Confirmez-vous la suppression de la réservation ?');
    if (result) {
      this.serviceBooking.deleteBooking(id).subscribe(() => {
        this.bookings.splice(index, 1);
        this.toastr.warning('La réservation a bien été supprimé', 'Suppression', {
          positionClass: 'toast-bottom-full-width',
        });
      });
    }
  }

  public sortDateEnd() {
    if (!this.isDateEnd) {
      this.bookings.sort((a, b) => {
        this.isDateEnd = !this.isDateEnd;
        return new Date(a.date.end).getTime() - new Date(b.date.end).getTime();
      });
    } else {
      this.isNameOrder = false;
      this.isNameUser = false;
      this.isDateStart = false;
      return this.bookings.reverse();
    }
  }

  public splice(index) {
    this.myEstablishments.splice(index, 1);
  }
}
