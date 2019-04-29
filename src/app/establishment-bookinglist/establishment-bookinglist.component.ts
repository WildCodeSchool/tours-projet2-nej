import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { BookingService } from '../common/services/booking.service';
import { EtablishmentService } from '../common/services/etablishment.service';
import { ToastrService } from 'ngx-toastr';
import { Booking } from '../common/models/booking.model';
import { Etablishment } from '../common/models/etablishment.models';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-establishment-bookinglist',
  templateUrl: './establishment-bookinglist.component.html',
  styleUrls: ['./establishment-bookinglist.component.css'],
})
export class EstablishmentBookinglistComponent implements OnInit {
  @Input() public bookings: Booking[];
  public establishment: Etablishment[];
  public nameUser: boolean = false;
  public dateStart: boolean = false;
  public dateEnd: boolean = false;

  constructor(
    private serviceBooking: BookingService,
    private serviceEstablishment: EtablishmentService,
    private toastr: ToastrService,
    public route: ActivatedRoute,
  ) {}

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

  ngOnInit() {
    this.route.paramMap.subscribe((params: ParamMap) => {
      const id = params.get('id');
      this.serviceBooking
        .getBookingByEstablishment(id)
        .subscribe((bookingList: Booking[]) => {
          this.bookings = bookingList;
          this.serviceEstablishment
            .getEtablishment(id)
            .subscribe((etablishmentInfo: Etablishment[]) => {
              this.establishment = etablishmentInfo;
            });
        });
    });
  }

  public sortNameUser() {
    if (!this.nameUser) {
      this.bookings.sort((a, b) => {
        this.nameUser = !this.nameUser;
        return a.owner.name.localeCompare(b.owner.name);
      });
    } else {
      this.dateStart = false;
      this.dateEnd = false;
      return this.bookings.reverse();
    }
  }

  public sortDateStart() {
    if (!this.dateStart) {
      this.bookings.sort((a, b) => {
        this.dateStart = !this.dateStart;
        return a.date.start.getTime() - b.date.start.getTime();
      });
    } else {
      this.nameUser = false;
      this.dateEnd = false;
      return this.bookings.reverse();
    }
  }

  public sortDateEnd() {
    if (!this.dateEnd) {
      this.bookings.sort((a, b) => {
        this.dateEnd = !this.dateEnd;
        return a.date.end.getTime() - b.date.end.getTime();
      });
    } else {
      this.nameUser = false;
      this.dateStart = false;
      return this.bookings.reverse();
    }
  }

}
