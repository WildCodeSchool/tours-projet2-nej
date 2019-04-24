import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProfileComponent } from './profile/profile.component';
import { BookingComponent } from './booking/booking.component';
import { EtablishmentComponent } from './etablishment/etablishment.component';
import { EstablishmentProfileComponent }
from './establishment-profile/establishment-profile.component';
import { UseraccountComponent } from './useraccount/useraccount.component';
import { EstablishmentBookinglistComponent }
from './establishment-bookinglist/establishment-bookinglist.component';
import { EstablishmentHomepageComponent }
from './establishment-homepage/establishment-homepage.component';

const routes: Routes = [
  { path: '', component: EstablishmentHomepageComponent },
  { path: 'etablishment', component: EtablishmentComponent },
  { path: 'userAccount/establishment-profile/:id', component: EtablishmentComponent },
  { path: 'userAccount/profile', component: ProfileComponent },
  { path: 'booking/establishment/:est', component: BookingComponent },
  { path: 'booking/:id', component: BookingComponent },
  { path: 'booking/:id/update', component: BookingComponent },
  { path: 'userAccount/establishment-profile/:id/bookings',
    component: EstablishmentBookinglistComponent },
  { path: 'userAccount', component: UseraccountComponent },
  { path: 'userAccount/establishment-profile', component: EstablishmentProfileComponent },
  { path: 'etablishment/:id', component: EtablishmentComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule { }
