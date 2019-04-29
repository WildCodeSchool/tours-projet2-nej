import { Component, OnInit } from '@angular/core';
import { Booking } from '../common/models/booking.model';
import { BookingService } from '../common/services/booking.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ParamMap, ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { EtablishmentService } from '../common/services/etablishment.service';
import {Location} from '@angular/common';

@Component({
  selector: 'app-booking',
  templateUrl: './booking.component.html',
  styleUrls: ['./booking.component.css'],
})
export class BookingComponent implements OnInit {
  public myDateValue: Date;
  public bookings: Booking;
  public etablishmentValue: [] = [];
  public dateStartUp: any;
  public dateStartDate: any;
  public dateStartTime: any;
  public dateEndUp: any;
  public dateEndDate: any;
  public dateEndTime: any;

  constructor(
    private service: BookingService,
    private fb: FormBuilder,
    public route: ActivatedRoute,
    public router: Router,
    private toastr: ToastrService,
    private serviceEst: EtablishmentService,
    private location: Location,
  ) {}

  bookingForm = this.fb.group({
    date: this.fb.group({
      date1: [''],
      start: [''],
      date2: [''],
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
          this.bookingForm.patchValue(this.bookings);
          this.dateStartUp = bookingValues.date.start.toString().split('T');
          this.dateStartDate = this.dateStartUp[0].split('-');
          this.dateStartTime = this.dateStartUp[1].split(':');
          this.bookingForm
            .get('date')
            .get('date1')
            .patchValue({
              year: parseInt(this.dateStartDate[0], 10),
              month: parseInt(this.dateStartDate[1], 10),
              day: parseInt(this.dateStartDate[2], 10),
            });
          this.bookingForm
            .get('date')
            .get('start')
            .patchValue({
              hour: parseInt(this.dateStartTime[0], 10),
              minute: parseInt(this.dateStartTime[1], 10),
            });

          this.dateEndUp = bookingValues.date.end.toString().split('T');
          this.dateEndDate = this.dateEndUp[0].split('-');
          this.dateEndTime = this.dateEndUp[1].split(':');
          this.bookingForm
            .get('date')
            .get('date2')
            .patchValue({
              year: parseInt(this.dateEndDate[0], 10),
              month: parseInt(this.dateEndDate[1], 10),
              day: parseInt(this.dateEndDate[2], 10),
            });
          this.bookingForm
            .get('date')
            .get('end')
            .patchValue({
              hour: parseInt(this.dateEndTime[0], 10),
              minute: parseInt(this.dateEndTime[1], 10),
            });
        });
      }
      // Réservation utilisateurs, récupération de l'ID de l'établissement
      if (est) {
        this.serviceEst
          .getEtablishment(est)
          .subscribe((etablishmentValue: any) => {
            this.etablishmentValue = etablishmentValue;
            this.bookingForm.controls.establishment.patchValue(est);
          });
      }
    });

  }

  public deleteBooking() {
    const result = confirm('Confirmez-vous la suppression de la réservation ?');
    if (result) {
      this.route.paramMap.subscribe((params: ParamMap) => {
        const id = params.get('id');
        this.service.deleteBooking(id).subscribe(() => {
          this.router.navigate(['']);
        });
      });
      this.toastr.warning(
      'La réservation a bien été supprimée',
      'Suppression', {
        positionClass: 'toast-bottom-full-width',
      },
    );
    }
  }

  onSubmit() {
    // appel le champs date du formulaire
    const formDate = this.bookingForm.get('date');
    console.log(formDate.get('date1').value);
    console.log(formDate.get('start').value);
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
          });
          this.toastr.success(
            'La réservation a bien été modifié',
            'Modification',
            {
              positionClass: 'toast-bottom-full-width',
            },
          );
        // Sans id, création d'une nouvelle réservation
      } else {
        this.service
          .createBooking(this.bookingForm.value)
          .subscribe((newbookingValues: Booking) => {
            this.bookings = newbookingValues;
          });
        this.toastr.success(
            'La réservation a bien été enregistré',
            'Modification',
          {
          positionClass: 'toast-bottom-full-width',
          },
        );
      }
    });
  }
// Revenir à la page précédente
  public previousPage() {
    this.location.back();
  }
}
