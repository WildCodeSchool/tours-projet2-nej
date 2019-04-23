import { TestBed } from '@angular/core/testing';

import { EstablishmentProfileService } from './establishment-profile.service';

describe('EstablishmentProfileService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: EstablishmentProfileService = TestBed.get(EstablishmentProfileService);
    expect(service).toBeTruthy();
  });
});
