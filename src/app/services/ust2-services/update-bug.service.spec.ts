import { TestBed } from '@angular/core/testing';

import { UpdateBugService } from './update-bug.service';

describe('UpdateBugService', () => {
  let service: UpdateBugService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UpdateBugService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
