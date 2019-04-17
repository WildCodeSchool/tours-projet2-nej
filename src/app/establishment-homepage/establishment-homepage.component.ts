import { Component, OnInit } from '@angular/core';
import { EtablishmentService } from '../common/services/etablishment.service';

@Component({
  selector: 'app-establishment-homepage',
  templateUrl: './establishment-homepage.component.html',
  styleUrls: ['./establishment-homepage.component.css'],
})
export class EstablishmentHomepageComponent implements OnInit {
  public pic: string;
  public establishmentsList: [] = [];
  constructor(private service: EtablishmentService) {}

  ngOnInit() {
    this.service.getAllEtablishment().subscribe((establismhents: any) => {
      this.establishmentsList = establismhents;
      console.log(this.establishmentsList)
    });
  }
}
