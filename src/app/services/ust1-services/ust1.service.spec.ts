import { TestBed } from '@angular/core/testing';

import { Ust1Service } from './ust1.service';

describe('Ust1Service', () => {
  let service: Ust1Service;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Ust1Service);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
