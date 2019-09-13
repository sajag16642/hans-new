import { TestBed } from '@angular/core/testing';

import { GaurdService } from './gaurd.service';

describe('GaurdService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: GaurdService = TestBed.get(GaurdService);
    expect(service).toBeTruthy();
  });
});
