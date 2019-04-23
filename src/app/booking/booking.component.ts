import { Component, OnInit } from '@angular/core';
import { Booking } from '../common/models/booking.model';
import { BookingService } from '../common/services/booking.service';
import { FormBuilder } from '@angular/forms';
import { ParamMap, ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { EtablishmentService } from '../common/services/etablishment.service';

@Component({
  selector: 'app-booking',
  templateUrl: './booking.component.html',
  styleUrls: ['./booking.component.css'],
})
export class BookingComponent implements OnInit {

  public bookings: Booking;
  public etablishmentValue: [] = [];

  constructor(
    private service: BookingService,
    private fb: FormBuilder,
    public route: ActivatedRoute,
    public router:Router,
    private toastr: ToastrService,
    private serviceEst: EtablishmentService,
  ) {}

  bookingForm = this.fb.group({
    date: this.fb.group({
      start: [''],
      end: [''],
    }),
    owner: this.fb.group({
      name: [''],
      address: this.fb.group({
        street: [''],
        zipCode: [''],
        city: [''],
        number: [''],
      }),
      contact: this.fb.group({
        phone: [''],
        email: [''],
      }),
    }),
    numbers: [''],
    establishment: [''],
  });

  ngOnInit() {
    // Route par id
    this.route.paramMap.subscribe((params: ParamMap) => {
      const id = params.get('id');
      const est = params.get('est');

       // Modification administrateur des réservations, récupération de l'ID de réservation
      if (id) {
        this.service.getBooking(id).subscribe((bookingValues: Booking) => {
          // Récupération de getBooking depuis le service
          this.bookings = bookingValues;
          // Le formulaire a pour valeurs par défaut les données récupérées
          this.bookingForm.patchValue(bookingValues);
        });
      }
     // Réservation utilisateurs, récupération de l'ID de l'établissement
      if (est) {
        this.serviceEst.getEtablishment(est).subscribe((etablishmentValue: any) => {
          this.etablishmentValue = etablishmentValue;
          this.bookingForm.controls.establishment.patchValue(est);
        });
      }
    });
  }

  public deleteBooking() {
    this.route.paramMap.subscribe((params: ParamMap) => {
      const id = params.get('id');
      this.service.deleteBooking(id)
        .subscribe(() => {
          this.router.navigate(['']);
        });
    });
  }

  onSubmit() {
    // Vérification des données saisies
    console.log(JSON.stringify(this.bookingForm.value));
    this.route.paramMap.subscribe((params: ParamMap) => {
      const id = params.get('id');
      console.log(id);
      // Si id, MAJ des données
      if (id) {
        this.service
          .updateBooking(this.bookingForm.value, id)
          .subscribe((newbookingValues: Booking) => {
            this.bookings = newbookingValues;
            this.toastr.success('La réservation a bien été modifié', 'Modification', {
              positionClass: 'toast-bottom-full-width',
            });
          });
      // Sans id, création d'une nouvelle réservation
      } else {
        this.service
        .createBooking(this.bookingForm.value)
        .subscribe((newbookingValues: Booking) => {
          this.bookings = newbookingValues;
        });
      }
    });
  }
}
