import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EstablishmentBookinglistComponent } from './establishment-bookinglist.component';

describe('EstablishmentBookinglistComponent', () => {
  let component: EstablishmentBookinglistComponent;
  let fixture: ComponentFixture<EstablishmentBookinglistComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EstablishmentBookinglistComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EstablishmentBookinglistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
