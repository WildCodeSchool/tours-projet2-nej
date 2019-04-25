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
import { LoginComponent } from './login/login.component';
import { AuthGuard } from './common/guards/auth.guard';
import { UserCreationComponent } from './user-creation/user-creation.component';

const routes: Routes = [
  { path: '', component: EstablishmentHomepageComponent },
  { path: 'userAccount/establishment-profile/:id', component: EtablishmentComponent },
  { path: 'userAccount/profile', component: ProfileComponent },
  { path: 'etablishment', component: EtablishmentComponent, canActivate: [AuthGuard] },
// tslint:disable-next-line: max-line-length
  { path: 'userAccount/establishment-profile/:id', component: EtablishmentComponent, canActivate: [AuthGuard] },
  { path: 'userAccount/profile', component: ProfileComponent, canActivate: [AuthGuard] },
  { path: 'booking/establishment/:est', component: BookingComponent },
  { path: 'booking/:id', component: BookingComponent },
  { path: 'booking/:id/update', component: BookingComponent },
  { path: 'userAccount/establishment-profile/:id/bookings',
    component: EstablishmentBookinglistComponent, canActivate: [AuthGuard] },
  { path: 'userAccount', component: UseraccountComponent, canActivate: [AuthGuard] },
// tslint:disable-next-line: max-line-length
  { path: 'userAccount/establishment-profile', component: EstablishmentProfileComponent, canActivate: [AuthGuard] },
  { path: 'etablishment/:id', component: EtablishmentComponent },
  { path: 'login', component: LoginComponent },
  { path: 'creation', component: UserCreationComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule { }
