import { Component, OnInit } from '@angular/core';
import { Booking } from '../common/models/booking.model';
import { BookingService } from '../common/services/booking.service';
import { FormBuilder } from '@angular/forms';
import { ParamMap, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-booking',
  templateUrl: './booking.component.html',
  styleUrls: ['./booking.component.css']
})
export class BookingComponent implements OnInit {
  route: any;
  id: string;
  public bookings: Booking;

  constructor(private service: BookingService, private fb: FormBuilder) {}

  bookingForm = this.fb.group({
    date: this.fb.group({
      start: [''],
      end: [''],
    }),
    owner: this.fb.group({
      name: [''],
      address: this.fb.group({
        street: [''],
        zipCode: [''],
        city: [''],
        number: [''],
      }),
      contact: this.fb.group({
        phone: [''],
        email: [''],
      }),
    }),
    numbers: [''],
    establishment: [''],
  });

  ngOnInit() {
    this.service.getBooking().subscribe((bookingValues: Booking) => {
      this.bookings = bookingValues;
      this.bookingForm.patchValue(bookingValues);
    });
  }

  onSubmit() {
    console.log(JSON.stringify(this.bookingForm.value));
  }
}

// Valeurs par défaut ?
//
//

// this.service.getFromAPI().subscribe(
//   (id) => {
//     this.bookingForm.controls[''].patchValue('id');
//   }
// Route pour id:
// this.route.paramMap.subscribe((params: ParamMap) => {
//   this.id = params.get('id');
// });
