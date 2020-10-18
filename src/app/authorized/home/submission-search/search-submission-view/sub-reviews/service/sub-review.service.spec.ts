import { TestBed } from '@angular/core/testing';

import { SubReviewService } from './sub-review.service';

describe('SubReviewService', () => {
  let service: SubReviewService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SubReviewService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
