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
import { EtablishmentComponent } from './etablishment/etablishment.component';
import { ProfileComponent } from './profile/profile.component';
import { JwtModule } from '@auth0/angular-jwt';
import { BookingComponent } from './booking/booking.component';
import { HttpClientModule } from '@angular/common/http';
import { EstablishmentBookinglistComponent }
  from './establishment-bookinglist/establishment-bookinglist.component';
import { EstablishmentProfileComponent }
from './establishment-profile/establishment-profile.component';
import { UseraccountComponent } from './useraccount/useraccount.component';
import { ToastrModule } from 'ngx-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LoginComponent } from './login/login.component';
import { UserCreationComponent } from './user-creation/user-creation.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    SearchBarComponent,
    EstablishmentHomepageComponent,
    UserHomepageComponent,
    EtablishmentComponent,
    BookingComponent,
    ProfileComponent,
    EstablishmentBookinglistComponent,
    EstablishmentProfileComponent,
    UseraccountComponent,
    LoginComponent,
    UserCreationComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    JwtModule.forRoot({
      config: {
        whitelistedDomains: ['open-reza.herokuapp.com'],
        tokenGetter: () => {
          return localStorage.getItem('token');
        },
      },
    }),
    ReactiveFormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot(),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule { }
