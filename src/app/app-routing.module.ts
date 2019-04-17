import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UserHomepageComponent } from './user-homepage/user-homepage.component';
import { ProfileComponent } from './profile/profile.component';
import { BookingComponent } from './booking/booking.component';
import { EtablishmentComponent } from './etablishment/etablishment.component';
<<<<<<< HEAD
// tslint:disable-next-line: max-line-length
import { EstablishmentProfileComponent } from './establishment-profile/establishment-profile.component';
=======
import { EstablishmentProfileComponent }
from './establishment-profile/establishment-profile.component';
>>>>>>> feature-integration
import { UseraccountComponent } from './useraccount/useraccount.component';
import { EstablishmentBookinglistComponent }
from './establishment-bookinglist/establishment-bookinglist.component';

const routes: Routes = [
  { path: '', component: UserHomepageComponent },
  { path: 'etablishment', component: EtablishmentComponent },
  { path: 'etablishment/:id', component: EtablishmentComponent },
  { path: 'profil', component: ProfileComponent },
  { path: 'booking', component: BookingComponent },
  { path: 'booking/:id', component: BookingComponent },
<<<<<<< HEAD
  { path: 'userAccount', component: UseraccountComponent },
  { path: 'profile', component: ProfileComponent },
  { path: 'establishment-profile', component: EstablishmentProfileComponent },
  { path: 'booking/:id/update', component: BookingComponent },
  { path: 'etablishment/:id/bookings', component: EstablishmentBookinglistComponent },
=======
  { path: 'booking/:id/update', component: BookingComponent },
  { path: 'etablishment/:id/bookings', component: EstablishmentBookinglistComponent },
  { path: 'userAccount', component: UseraccountComponent },
  { path: 'profile', component: ProfileComponent },
  { path: 'establishment-profile', component: EstablishmentProfileComponent },
>>>>>>> feature-integration
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule { }
