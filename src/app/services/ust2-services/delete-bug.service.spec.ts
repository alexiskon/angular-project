import { TestBed } from '@angular/core/testing';

import { DeleteBugService } from './delete-bug.service';

describe('DeleteBugService', () => {
  let service: DeleteBugService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DeleteBugService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
