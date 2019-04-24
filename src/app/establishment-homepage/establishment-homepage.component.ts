import { Component, OnInit } from '@angular/core';
import { EtablishmentService } from '../common/services/etablishment.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FormBuilder } from '@angular/forms';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-establishment-homepage',
  templateUrl: './establishment-homepage.component.html',
  styleUrls: ['./establishment-homepage.component.css'],
})
export class EstablishmentHomepageComponent implements OnInit {
  public pic: string;
  public establishmentsList: [] = [];

  types: any[] = [
    { name: 'Bars et restaurants', id: '' },
    { name: 'Bars', id: 'Bar' },
    { name: 'Restaurants', id: 'Restaurant' },
  ];

  searchBar = this.fb.group({
    searchName: [''],
    type: [''],
  });

  constructor(
    private serviceEst: EtablishmentService,
    private modalService: NgbModal,
    private fb: FormBuilder) {}

  ngOnInit() {
    this.serviceEst.getAllEtablishment().subscribe((establismhents: any) => {
      this.establishmentsList = establismhents;
      console.log(this.establishmentsList);
    });
    this.searchBar.valueChanges.subscribe((value) => {
      console.log('Valeurs modifiées', value);
    });
    this.searchBar.controls['type'].patchValue(this.types[0].id);
  }

  public search() {
// tslint:disable-next-line: max-line-length
    this.serviceEst.searchedEtablishment(this.searchBar.controls['type'].value, this.searchBar.controls['searchName'].value)
    .subscribe((establismhents: any) => {
      this.establishmentsList = establismhents;
    });
  }
  open(content) {
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' });
  }


}
