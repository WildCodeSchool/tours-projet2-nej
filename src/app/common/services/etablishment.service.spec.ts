import { TestBed } from '@angular/core/testing';

import { EtablishmentService } from './etablishment.service';

describe('EtablishementService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: EtablishmentService = TestBed.get(EtablishmentService);
    expect(service).toBeTruthy();
  });
});
