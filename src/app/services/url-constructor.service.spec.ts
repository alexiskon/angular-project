import { TestBed } from '@angular/core/testing';

import { UrlConstructor } from './url-constructor.service';

describe('SearchService', () => {
  let service: UrlConstructor;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UrlConstructor);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
