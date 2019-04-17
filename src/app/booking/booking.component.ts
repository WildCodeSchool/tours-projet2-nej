import { Component, OnInit } from '@angular/core';
import { Booking } from '../common/models/booking.model';
import { BookingService } from '../common/services/booking.service';
import { FormBuilder } from '@angular/forms';
import { ParamMap, ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-booking',
  templateUrl: './booking.component.html',
  styleUrls: ['./booking.component.css'],
})
export class BookingComponent implements OnInit {
  id: string;
  public bookings: Booking;

  constructor(
    private service: BookingService,
    private fb: FormBuilder,
    public route: ActivatedRoute,
    public router:Router,
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
      // Récupération de getBooking depuis le service
      if (id) {
        this.service.getBooking(id).subscribe((bookingValues: Booking) => {
          this.bookings = bookingValues;
        // Le formulaire a pour valeurs par défaut les données récupérées
          this.bookingForm.patchValue(bookingValues);
        });
      }
    });
  }
  public deleteBooking() {
    this.route.paramMap.subscribe((params: ParamMap) => {
      const id = params.get('id');
      this.service.deleteBooking(id)
        .subscribe(() => {
          this.router.navigate(['']);
        });
    });
  }

  onSubmit() {
    // Vérification des données saisies
    console.log(JSON.stringify(this.bookingForm.value));
  }
}
