import { TestBed } from '@angular/core/testing';

import { SubmissionViewService } from './submission-view.service';

describe('SubmissionViewService', () => {
  let service: SubmissionViewService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SubmissionViewService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
