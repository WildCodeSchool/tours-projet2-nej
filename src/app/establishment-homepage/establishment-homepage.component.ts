import { Component, OnInit } from '@angular/core';
import { EtablishmentService } from '../common/services/etablishment.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FormBuilder } from '@angular/forms';
import { Observable } from 'rxjs';
import { debounceTime, distinctUntilChanged, map } from 'rxjs/operators';

@Component({
  selector: 'app-establishment-homepage',
  templateUrl: './establishment-homepage.component.html',
  styleUrls: ['./establishment-homepage.component.css'],
})
export class EstablishmentHomepageComponent implements OnInit {
  public pic: string;
  public establishmentsList: any;
  public establishmentsName = [];

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
    this.serviceEst.getAllEtablishment().subscribe((establismhents) => {
      this.establishmentsList = establismhents;
      console.log(this.establishmentsList);
      // Création d'un tableau de nom pour l'autocomplétion
      for (let i = 0; i < this.establishmentsList.length; i += 1) {
        this.establishmentsName.push(establismhents[i].name);
      }
      console.log(this.establishmentsName);
    });
    this.searchBar.valueChanges.subscribe((value) => {
      console.log('Valeurs modifiées', value);
    });
    this.searchBar.controls['type'].patchValue(this.types[0].id);
  }

  public search() {
    // Envoi type et bar pour filtrer
// tslint:disable-next-line: max-line-length
    this.serviceEst.searchedEtablishment(this.searchBar.controls['type'].value, this.searchBar.controls['searchName'].value)
    .subscribe((establismhents: any) => {
      this.establishmentsList = establismhents;
    });
  }
// Modale
  public open(content) {
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' });
  }
// Autocomplétion de la barre de recherche
  public autocomplete = (text$: Observable<string>) =>
    text$.pipe(
      debounceTime(200),
      distinctUntilChanged(),
      map(term => term.length < 2 ? []
        : this.establishmentsName.filter(v => v.toLowerCase()
        .indexOf(term.toLowerCase()) > -1).slice(0, 10)),
    )

}
