import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EstablishmentHomepageComponent } from './establishment-homepage.component';

describe('EstablishmentHomepageComponent', () => {
  let component: EstablishmentHomepageComponent;
  let fixture: ComponentFixture<EstablishmentHomepageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EstablishmentHomepageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EstablishmentHomepageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
