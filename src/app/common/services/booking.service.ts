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
  public api = 'http://open-reza.herokuapp.com:80/api';
  public id = '5cadddf64170bf000fdb8315';
  public getBooking(id: string): Observable<Booking> {
    const bookingObs: Observable<any> = this.http.get(`${this.api}/bookings/${id}`);
    const bookingArr = (param: any) => {
      return param as Booking;
    };
    return bookingObs.pipe(map(bookingArr));
  }
}
