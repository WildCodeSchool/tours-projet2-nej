import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EtablishmentComponent } from './etablishment.component';

describe('EtablishmentComponent', () => {
  let component: EtablishmentComponent;
  let fixture: ComponentFixture<EtablishmentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EtablishmentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EtablishmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
