import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SearchBarComponent } from './search-bar/search-bar.component';
import { UserHomepageComponent } from './user-homepage/user-homepage.component';
import { EstablishmentHomepageComponent }
from './establishment-homepage/establishment-homepage.component';
import { ProfileComponent } from './profile/profile.component';

const routes: Routes = [
  { path: '', component: UserHomepageComponent },
  { path: 'profil', component: ProfileComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
