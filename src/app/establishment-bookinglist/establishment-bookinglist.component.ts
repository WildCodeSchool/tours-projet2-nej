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

  public bookingEstablishmentList: [] = [];
  public establishmentInfo: [] = [];

  constructor(
    private serviceB: BookingService,
    private serviceE: EtablishmentService,
    private toastr: ToastrService,
    public route: ActivatedRoute,
    ) {}

  public deleteBooking(id, index) {
    const result = confirm('Confirmez-vous la suppression de la réservation ?');
    if (result) {
      this.serviceB.deleteBooking(id).subscribe(() => {
        this.bookingEstablishmentList.splice(index, 1);
      });
      this.toastr.warning('La réservation a bien été supprimé')
    }
  }

  ngOnInit() {
    this.route.paramMap.subscribe((params: ParamMap) => {
      const id = params.get('id');
      this.serviceB.getBookingByEstablishment(id).subscribe((bookinglist: any) => {
        this.bookingEstablishmentList = bookinglist;
        this.serviceE.getEtablishment(id).subscribe((etablishmentInfo: any) => {
          this.establishmentInfo = etablishmentInfo;
        });
      });
    });
  }
}
