import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EtablishmentCreationComponent } from './etablishment-creation.component';

describe('EtablishmentCreationComponent', () => {
  let component: EtablishmentCreationComponent;
  let fixture: ComponentFixture<EtablishmentCreationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EtablishmentCreationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EtablishmentCreationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
