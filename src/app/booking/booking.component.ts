import { Component, OnInit } from '@angular/core';
import { Booking } from '../common/models/booking.model';
import { BookingService } from '../common/services/booking.service';
import { FormBuilder } from '@angular/forms';
import { ParamMap, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-booking',
  templateUrl: './booking.component.html',
  styleUrls: ['./booking.component.css'],
})
export class BookingComponent implements OnInit {
  public bookings: Booking;
  constructor(
    private service: BookingService,
    private fb: FormBuilder,
    public route: ActivatedRoute,
  ) {}

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
    // Route par id
    this.route.paramMap.subscribe((params: ParamMap) => {
      const id = params.get('id');
      if (id) {
        this.service.getBooking(id).subscribe((bookingValues: Booking) => {
          // Récupération de getBooking depuis le service
          this.bookings = bookingValues;
          // Le formulaire a pour valeurs par défaut les données récupérées
          this.bookingForm.patchValue(bookingValues);
        });
      }
    });
  }

  onSubmit() {
    // Vérification des données saisies
    console.log(JSON.stringify(this.bookingForm.value));
    // Méthode Create
    this.service
      .createBooking(this.bookingForm.value)
      .subscribe((newbookingValues: Booking) => {
        this.bookings = newbookingValues;
      });
  }
}
