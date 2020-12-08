import { TestBed } from '@angular/core/testing';

import { PostBugService } from './post-bug.service';

describe('PostBugService', () => {
  let service: PostBugService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PostBugService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
