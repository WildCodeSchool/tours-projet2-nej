import { Injectable } from '@angular/core';
import { Booking } from '../models/booking.model';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class BookingService {

  
  constructor(private http: HttpClient) {
  }

  public getBooking(): Observable<Booking> {
    const bookingObs: Observable<any> = this.http.get('http://open-reza.herokuapp.com/api/bookings/5cadddf64170bf000fdb8315');
    const bookingArr = (param: any) => {
      return param as Booking;
    };
    return bookingObs.pipe(map(bookingArr));
  }
}