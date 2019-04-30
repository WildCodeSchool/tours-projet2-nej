import { Component, OnInit } from '@angular/core';
import { EtablishmentService } from '../common/services/etablishment.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FormBuilder } from '@angular/forms';
import { Observable } from 'rxjs';
import { debounceTime, distinctUntilChanged, map } from 'rxjs/operators';
import { Etablishment } from '../common/models/etablishment.models';

@Component({
  selector: 'app-establishment-homepage',
  templateUrl: './establishment-homepage.component.html',
  styleUrls: ['./establishment-homepage.component.css'],
})
export class EstablishmentHomepageComponent implements OnInit {
  public establishments: Etablishment[];
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
    private modalService: NgbModal,
    private fb: FormBuilder,
    private serviceEstablishment: EtablishmentService,
    ) {}

  ngOnInit() {
    this.serviceEstablishment.getAllEtablishment().subscribe((establismhents) => {
      this.establishments = establismhents;
      // Création d'un tableau de nom pour l'autocomplétion
      for (let i = 0; i < this.establishments.length; i += 1) {
        this.establishmentsName.push(establismhents[i].name);
      }
    });
    this.searchBar.valueChanges.subscribe((value) => {
    });
    this.searchBar.controls['type'].patchValue(this.types[0].id);
    this.serviceEstablishment.getAllEtablishment().subscribe((establismhents) => {
      this.establishments = establismhents;
    });
  }

  public search() {
    // Envoi type et bar pour filtrer

    this.serviceEstablishment.searchedEtablishment(
      this.searchBar.controls['type'].value, this.searchBar.controls['searchName'].value)
    .subscribe((establismhents: any) => {
      this.establishments = establismhents;
    });
  }

// Lorsque le résultation de l'autocomplétion est sélectionné, le résulat s'affiche
  selectedItem($event) {
    this.search();
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
