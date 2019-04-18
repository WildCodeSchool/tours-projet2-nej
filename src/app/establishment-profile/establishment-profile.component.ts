import { Component, OnInit } from '@angular/core';
import { EstablishmentProfileService } from '../common/services/establishment-profile.service';
import { Etablishment } from '../common/models/etablishment.models';
@Component({
  selector: 'app-establishment-profile',
  templateUrl: './establishment-profile.component.html',
  styleUrls: ['./establishment-profile.component.css'],
})
export class EstablishmentProfileComponent implements OnInit {

  private establishments = [];

  constructor(private service: EstablishmentProfileService) {}

  public ngOnInit(): void {
    this.service.get().subscribe(
      (establishment: Etablishment[]) => {
        this.establishments = establishment;
        console.log(establishment);
      },
    );
  }

}
