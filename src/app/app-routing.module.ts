import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UserHomepageComponent } from './user-homepage/user-homepage.component';
import { ProfileComponent } from './profile/profile.component';
import { BookingComponent } from './booking/booking.component';
import { EtablishmentComponent } from './etablishment/etablishment.component';
// tslint:disable-next-line: max-line-length
import { EstablishmentProfileComponent } from './establishment-profile/establishment-profile.component';

const routes: Routes = [
  { path: '', component: UserHomepageComponent },
  { path: 'etablishment', component: EtablishmentComponent },
  { path: 'etablishment/:id', component: EtablishmentComponent },
  { path: 'profil', component: ProfileComponent },
  { path: 'booking', component: BookingComponent },
  { path: 'booking/:id', component: BookingComponent },
  { path: 'connexion', component: EstablishmentProfileComponent },
  { path: 'coordonnees', component: ProfileComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule { }
