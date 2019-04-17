import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { BookingService } from '../common/services/booking.service';
import { EtablishmentService } from '../common/services/etablishment.service';
import { ajax } from 'rxjs/ajax';
import { from } from 'rxjs';

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

    public route: ActivatedRoute,
    ) {}
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
