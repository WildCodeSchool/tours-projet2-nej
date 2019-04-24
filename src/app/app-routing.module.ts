import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UserHomepageComponent } from './user-homepage/user-homepage.component';
import { ProfileComponent } from './profile/profile.component';
import { BookingComponent } from './booking/booking.component';
import { EtablishmentComponent } from './etablishment/etablishment.component';
import { EstablishmentProfileComponent }
from './establishment-profile/establishment-profile.component';
import { UseraccountComponent } from './useraccount/useraccount.component';
import { EstablishmentBookinglistComponent }
from './establishment-bookinglist/establishment-bookinglist.component';
import { LoginComponent } from './login/login.component';
import { AuthGuard } from './common/guards/auth.guard';

const routes: Routes = [
  { path: '', component: UserHomepageComponent },
  { path: 'etablishment', component: EtablishmentComponent },
  { path: 'userAccount/establishment-profile/:id', component: EtablishmentComponent },
  { path: 'userAccount/profile', component: ProfileComponent },
  { path: 'booking/establishment/:est', component: BookingComponent },
  { path: 'booking/:id', component: BookingComponent },
  { path: 'booking/:id/update', component: BookingComponent },
  { path: 'userAccount/establishment-profile/:id/bookings',
    component: EstablishmentBookinglistComponent },
  { path: 'userAccount', component: UseraccountComponent, canActivate: [AuthGuard] },
  { path: 'userAccount/establishment-profile', component: EstablishmentProfileComponent },
  { path: 'etablishment/:id', component: EtablishmentComponent },
  { path: 'login', component: LoginComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule { }
