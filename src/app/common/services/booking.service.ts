import { Injectable } from '@angular/core';
import { Booking } from '../models/booking.model';

@Injectable({
  providedIn: 'root',
})
export class BookingService {
  booking:Booking;
  bookings: Booking[];
  constructor() { }
  getbooking(): Booking[] {
  // Récupération des etablissement en format 'string'
    return this.bookings;
  }
}
