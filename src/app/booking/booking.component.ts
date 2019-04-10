import { Component, OnInit } from '@angular/core';
import { Booking } from '../common/models/booking.model';
import { BookingService } from '../common/services/booking.service';
import { FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-booking',
  templateUrl: './booking.component.html',
  styleUrls: ['./booking.component.css']
})
export class BookingComponent implements OnInit {
  constructor(private service: BookingService, private fb: FormBuilder) {}

  public booking: Booking;
  public bookings: Booking[] = [];

  bookingForm = this.fb.group({
    dateBooking: this.fb.group({
      dateInBooking: [''],
      dateOutBooking: [''],
    }),
    ownerInfo: this.fb.group({
      nameBooking:[''],
      Adress: this.fb.group({
        streetNameBooking: [''],
        zipCodeBooking: [''],
        townNameBooking: [''],
        streetNumberBooking: [''],
      }),
      Contact: this.fb.group({
        phoneBooking: [''],
        emailBooking: [''],
      }),
    }),
    numberPersBooking: [''],
    establishmentBooking: [''],
  });

  onSubmit() {
    console.log(this.bookingForm.value)
  }

  ngOnInit() {

    this.bookingForm.valueChanges.subscribe((value) => {
      console.log('Valeurs saisies', value);
    });

    this.service.getFromAPI();
  }
}
