import { Injectable } from '@angular/core';
import { Booking } from '../models/booking.model';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class BookingService {

  constructor(private http: HttpClient) {
  }

  public api = `${environment.apiUrl}`;

  public getBooking(id: string): Observable<Booking> {
    const bookingObs: Observable<any> = this.http.get(`${this.api}/bookings/${id}`);
    const bookingArr = (param: any) => {
      return param as Booking;
    };
    return bookingObs.pipe(map(bookingArr));
  }

  public createBooking(bookingForm:Booking): Observable<Booking> {
    return this.http.post<Booking>(`${this.api}/bookings/`, bookingForm);
  }

  public updateBooking(bookingForm:Booking, id:any): Observable<Booking> {
    return this.http.put<Booking>(`${this.api}/bookings/${id}`, bookingForm);
  }

  public getBookingByEstablishment(id: string): Observable<Booking[]> {
    const bookingObs =
    this.http.get<Booking[]>(`${this.api}/establishments/${id}/bookings`);
    const bookingArrByEst = (param: any) => {
      return param as Booking[];
    };
    return bookingObs.pipe(map(bookingArrByEst));
  }

  public deleteBooking(id: string): Observable<any> {
    return this.http.delete(
      `${this.api}/bookings/${id}`);
  }

  public getAllBookings(): Observable<Booking[]> {
    return this.http.get(
        `${this.api}/bookings`)
        .pipe(map((allMyBookings: any) => {
          return allMyBookings as Booking[];
        }),
      );
  }
}
