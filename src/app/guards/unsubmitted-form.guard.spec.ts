import { TestBed } from '@angular/core/testing';

import { UnsubmittedFormGuard } from './unsubmitted-form.guard';

describe('UnsubmittedFormGuard', () => {
  let guard: UnsubmittedFormGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(UnsubmittedFormGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
