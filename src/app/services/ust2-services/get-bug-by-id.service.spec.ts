import { TestBed } from '@angular/core/testing';

import { GetBugByIdService } from './get-bug-by-id.service';

describe('GetBugByIdService', () => {
  let service: GetBugByIdService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GetBugByIdService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
