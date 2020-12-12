import { TestBed } from '@angular/core/testing';

import { UrlConstructorService } from './url-constructor.service';

describe('UrlConstructorService', () => {
  let service: UrlConstructorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UrlConstructorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
