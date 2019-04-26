import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { BookingService } from '../common/services/booking.service';
import { EtablishmentService } from '../common/services/etablishment.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-establishment-bookinglist',
  templateUrl: './establishment-bookinglist.component.html',
  styleUrls: ['./establishment-bookinglist.component.css'],
})
export class EstablishmentBookinglistComponent implements OnInit {
  public bookingEstablishmentList = [];
  public establishmentInfo: [] = [];
  public nameUser: boolean = false;
  public dateStart: boolean = false;
  public dateEnd: boolean = false;

  constructor(
    private serviceBook: BookingService,
    private serviceEst: EtablishmentService,
    private toastr: ToastrService,
    public route: ActivatedRoute,
  ) {}

  public deleteBooking(id, index) {
    const result = confirm('Confirmez-vous la suppression de la réservation ?');
    if (result) {
      this.serviceBook.deleteBooking(id).subscribe(() => {
        this.bookingEstablishmentList.splice(index, 1);
      });
      this.toastr.warning('La réservation a bien été supprimé', 'Suppression', {
        positionClass: 'toast-bottom-full-width',
      });
    }
  }

  ngOnInit() {
    this.route.paramMap.subscribe((params: ParamMap) => {
      const id = params.get('id');
      this.serviceBook
        .getBookingByEstablishment(id)
        .subscribe((bookinglist: any) => {
          this.bookingEstablishmentList = bookinglist;
          this.serviceEst
            .getEtablishment(id)
            .subscribe((etablishmentInfo: any) => {
              this.establishmentInfo = etablishmentInfo;
            });
        });
    });
  }
  

  public sortNameUser() {
    if (!this.nameUser) {
      this.bookingEstablishmentList.sort((a, b) => {
        this.nameUser = !this.nameUser;
        return a.owner.name.localeCompare(b.owner.name);
      });
    } else {
      this.dateStart = false;
      this.dateEnd = false;
      return this.bookingEstablishmentList.reverse();
    }
  }

  public sortDateStart() {
    if (!this.dateStart) {
      this.bookingEstablishmentList.sort((a, b) => {
        this.dateStart = !this.dateStart;
        return a.date.start.localeCompare(b.date.start);
      });
    } else {
      this.nameUser = false;
      this.dateEnd = false;
      return this.bookingEstablishmentList.reverse();
    }
  }

  public sortDateEnd() {
    if (!this.dateEnd) {
      this.bookingEstablishmentList.sort((a, b) => {
        this.dateEnd = !this.dateEnd;
        return a.date.end.localeCompare(b.date.end);
      });
    } else {
      this.nameUser = false;
      this.dateStart = false;
      return this.bookingEstablishmentList.reverse();
    }
  }

}
