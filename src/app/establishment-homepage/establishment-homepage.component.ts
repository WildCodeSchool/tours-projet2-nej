import { Component, OnInit } from '@angular/core';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
@Component({
  selector: 'app-establishment-homepage',
  templateUrl: './establishment-homepage.component.html',
  styleUrls: ['./establishment-homepage.component.css'],
})
export class EstablishmentHomepageComponent implements OnInit {
  constructor(private modalService: NgbModal) {}

  open(content) {
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' });
  }

  ngOnInit() {}

  establishments = [
    {
      name: 'Card 1',
      desc: "Description de l'établissement 1",
      pic:
        'https://images.freeimages.com/images/large-previews/00a/english-town-pub-1565179.jpg',
    },
    {
      name: 'Card 2',
      desc: "Description de l'établissement 2",
      pic:
        'https://images.freeimages.com/images/large-previews/f06/irish-pub-1233434.jpg',
    },
    {
      name: 'Card 3',
      desc: "Description de l'établissement 3",
      pic:
        'https://images.freeimages.com/images/large-previews/b89/irish-pub-1231950.jpg',
    },
    {
      name: 'Card 1',
      desc: "Description de l'établissement 1",
      pic:
        'https://images.freeimages.com/images/large-previews/00a/english-town-pub-1565179.jpg',
    },
    {
      name: 'Card 2',
      desc: "Description de l'établissement 2",
      pic:
        'https://images.freeimages.com/images/large-previews/f06/irish-pub-1233434.jpg',
    },
    {
      name: 'Card 3',
      desc: "Description de l'établissement 3",
      pic:
        'https://images.freeimages.com/images/large-previews/b89/irish-pub-1231950.jpg',
    },
  ];
}
