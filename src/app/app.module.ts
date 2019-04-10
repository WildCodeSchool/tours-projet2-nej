import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { SearchBarComponent } from './search-bar/search-bar.component';
import { EstablishmentHomepageComponent }
from './establishment-homepage/establishment-homepage.component';
import { UserHomepageComponent } from './user-homepage/user-homepage.component';
import { ProfileComponent } from './profile/profile.component';

import { ProfileService } from './common/services/profile.service';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    SearchBarComponent,
    EstablishmentHomepageComponent,
    UserHomepageComponent,
    ProfileComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  providers: [
    ProfileService,
  ],
  bootstrap: [AppComponent],
})
export class AppModule { }
