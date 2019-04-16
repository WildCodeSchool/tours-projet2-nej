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
  public api = 'http://open-reza.herokuapp.com/api/bookings/';

  public getBooking(id: string): Observable<Booking> {
    const bookingObs: Observable<any> = this.http.get(`${this.api}${id}`);
    const bookingArr = (param: any) => {
      return param as Booking;
    };
    return bookingObs.pipe(map(bookingArr));
  }

  public createBooking(bookingForm:Booking): Observable<Booking> {
    return this.http.post<Booking>(this.api, bookingForm);
  }

  public updateBooking(bookingForm:Booking, id:any): Observable<Booking> {
    return this.http.put<Booking>(`${this.api}${id}`, bookingForm);
  }
}
