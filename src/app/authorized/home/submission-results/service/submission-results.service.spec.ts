import { TestBed } from '@angular/core/testing';

import { SubmissionResultsService } from './submission-results.service';

describe('SubmissionResultsService', () => {
  let service: SubmissionResultsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SubmissionResultsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
