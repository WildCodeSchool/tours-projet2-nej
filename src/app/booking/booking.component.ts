import { Component, OnInit } from '@angular/core';
import { Booking } from '../common/models/booking.model';
import { BookingService } from '../common/services/booking.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ParamMap, ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { EtablishmentService } from '../common/services/etablishment.service';
import { Location } from '@angular/common';
import { Etablishment } from '../common/models/etablishment.models';

@Component({
  selector: 'app-booking',
  templateUrl: './booking.component.html',
  styleUrls: ['./booking.component.css'],
})
export class BookingComponent implements OnInit {
  public booking: Booking;
  public etablishments: Etablishment[];
  public id: string;

  constructor(
    private service: BookingService,
    private fb: FormBuilder,
    public route: ActivatedRoute,
    public router: Router,
    private toastr: ToastrService,
    private serviceEtablishment: EtablishmentService,
    private location: Location,
  ) { }

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
      this.id = params.get('id');
      const establishmentId = params.get('est');

      // Modification administrateur des réservations, récupération de l'ID de réservation
      if (this.id) {
        this.service.getBooking(this.id).subscribe((bookingValues: Booking) => {
          // Récupération de getBooking depuis le service
          this.booking = bookingValues;
          // Le formulaire a pour valeurs par défaut les données récupérées
          this.bookingForm.patchValue(this.booking);
          const dateStartUp = this.booking.date.start.toString().split('T');
          const dateStartDate = dateStartUp[0].split('-');
          const dateStartTime = dateStartUp[1].split(':');
          this.bookingForm
            .get('date')
            .get('date1')
            .patchValue({
              year: parseInt(dateStartDate[0], 10),
              month: parseInt(dateStartDate[1], 10),
              day: parseInt(dateStartDate[2], 10),
            });
          this.bookingForm
            .get('date')
            .get('start')
            .patchValue({
              hour: parseInt(dateStartTime[0], 10),
              minute: parseInt(dateStartTime[1], 10),
            });

          const dateEndUp = bookingValues.date.end.toString().split('T');
          const dateEndDate = dateEndUp[0].split('-');
          const dateEndTime = dateEndUp[1].split(':');
          this.bookingForm
            .get('date')
            .get('date2')
            .patchValue({
              year: parseInt(dateEndDate[0], 10),
              month: parseInt(dateEndDate[1], 10),
              day: parseInt(dateEndDate[2], 10),
            });
          this.bookingForm
            .get('date')
            .get('end')
            .patchValue({
              hour: parseInt(dateEndTime[0], 10),
              minute: parseInt(dateEndTime[1], 10),
            });
        });
      }
      // Réservation utilisateurs, récupération de l'ID de l'établissement
      if (establishmentId) {
        this.serviceEtablishment
          .getEtablishment(establishmentId)
          .subscribe((etablishmentValue: any) => {
            this.etablishments = etablishmentValue;
            this.bookingForm.controls.establishment.patchValue(establishmentId);
          });
      }
    });

  }

  public deleteBooking() {
    const result = confirm('Confirmez-vous la suppression de la réservation ?');
    if (result) {
      this.service.deleteBooking(this.id).subscribe(() => {
        this.router.navigate(['']);
        this.toastr.warning(
          'La réservation a bien été supprimée',
          'Suppression', {
            positionClass: 'toast-bottom-full-width',
          },
        );
      });
    }
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
    // definis les champs de la date de fin
    const dateEnd = new Date(
      formDate.get('date2').value.year,
      formDate.get('date2').value.month,
      formDate.get('date2').value.day,
      formDate.get('end').value.hour,
      formDate.get('end').value.minute,
      formDate.get('end').value.second,
    );

    // rassemble les champs de dateSart/dateEnd pour avoir le bon format(date)
    const booking = this.bookingForm.value;
    booking.date = {
      start: dateStart,
      end: dateEnd,
    };
    // Si id, MAJ des données
    if (this.id) {
      this.service
        .updateBooking(this.bookingForm.value, this.id)
        .subscribe((newbookingValues: Booking) => {
          this.booking = newbookingValues;

          this.toastr.success(
            'La réservation a bien été modifié',
            'Modification',
            {
              positionClass: 'toast-bottom-full-width',
            },
          );
        });
      // Sans id, création d'une nouvelle réservation
    } else {
      this.service
        .createBooking(this.bookingForm.value)
        .subscribe((newbookingValues: Booking) => {
          this.booking = newbookingValues;
          this.toastr.success(
            'La réservation a bien été enregistré',
            'Modification',
            {
              positionClass: 'toast-bottom-full-width',
            },
          );
        });
    }

  }
  // Revenir à la page précédente
  public previousPage() {
    this.location.back();
  }
}
