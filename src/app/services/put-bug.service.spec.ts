import { TestBed } from '@angular/core/testing';

import { PutBugService } from './put-bug.service';

describe('PutBugService', () => {
  let service: PutBugService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PutBugService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
