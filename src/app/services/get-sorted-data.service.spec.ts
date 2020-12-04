import { TestBed } from '@angular/core/testing';

import { GetSortedDataService } from './get-sorted-data.service';

describe('GetSortedDataService', () => {
  let service: GetSortedDataService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GetSortedDataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
