import { Component, OnInit } from '@angular/core';
import { Booking } from '../common/models/booking.model';
import { BookingService } from '../common/services/booking.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ParamMap, ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { EtablishmentService } from '../common/services/etablishment.service';

@Component({
  selector: 'app-booking',
  templateUrl: './booking.component.html',
  styleUrls: ['./booking.component.css'],
})
export class BookingComponent implements OnInit {
  public myDateValue: Date;
  public bookings: Booking;
  public etablishmentValue: [] = [];

  constructor(
    private service: BookingService,
    private fb: FormBuilder,
    public route: ActivatedRoute,
    public router: Router,
    private toastr: ToastrService,
    private serviceEst: EtablishmentService,
  ) { }

  bookingForm = this.fb.group({
    date: this.fb.group({
      date1: ['', Validators.required],
      start: ['', Validators.required],
      date2:['', Validators.required],
      end: ['', Validators.required],
    }),
    owner: this.fb.group({
      name: ['', Validators.required],
      address: this.fb.group({
        street: ['', Validators.required],
        zipCode: ['', Validators.required],
        city: ['', Validators.required],
        number: ['', Validators.required],
      }),
      contact: this.fb.group({
        phone: ['', Validators.required],
        email: ['', Validators.required],
      }),
    }),
    numbers: ['', Validators.required],
    establishment: ['', Validators.required],
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
    // appel le champs date du formulaire
    const formDate = this.bookingForm.get('date');
    // definis les champs de la date de début
    const dateStart = new Date(
      formDate.get('date1').value.year,
      formDate.get('date1').value.month,
      formDate.get('date1').value.day,
      formDate.get('start').value.hour,
      formDate.get('start').value.minute,
      formDate.get('start').value.second,
    );
    console.log(dateStart);
      // definis les champs de la date de fin
    const dateEnd = new Date(
      formDate.get('date2').value.year,
      formDate.get('date2').value.month,
      formDate.get('date2').value.day,
      formDate.get('end').value.hour,
      formDate.get('end').value.minute,
      formDate.get('end').value.second,
    );

    console.log(dateEnd);
      // rassemble les champs de dateSart/dateEnd pour avoir le bon format(date)
    const booking = this.bookingForm.value;
    booking.date = {
      start: dateStart,
      end: dateEnd,
    };
    // Vérification des données saisies
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

  get date() {
    return this.bookingForm.get('date');
  }
  get owner() {
    return this.bookingForm.get('owner');
  }
  get address() {
    return this.owner.get('address');
  }
  get contact() {
    return this.owner.get('contact');
  }
  get numbers() {
    return this.bookingForm.get('numbers');
  }
  get establishment() {
    return this.bookingForm.get('establishment');
  }
}
