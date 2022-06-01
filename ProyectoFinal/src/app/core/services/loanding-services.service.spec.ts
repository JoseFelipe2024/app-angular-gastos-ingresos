import { TestBed } from '@angular/core/testing';

import { LoandingServicesService } from './loanding-services.service';

describe('LoandingServicesService', () => {
  let service: LoandingServicesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LoandingServicesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
