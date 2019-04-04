import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SearchBarComponent } from './search-bar/search-bar.component';
import { UserHomepageComponent } from './user-homepage/user-homepage.component';
import { EstablishmentHomepageComponent }
from './establishment-homepage/establishment-homepage.component';

const routes: Routes = [
  { path: '', component: UserHomepageComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
