import { TestBed } from '@angular/core/testing';

import { PagingServiceService } from './paging-service.service';

describe('PagingServiceService', () => {
  let service: PagingServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PagingServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
