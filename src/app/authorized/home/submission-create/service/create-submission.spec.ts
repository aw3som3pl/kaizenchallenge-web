import { TestBed } from '@angular/core/testing';

import { CreateSubmissionService } from './create-submission.service';

describe('HomeService', () => {
  let service: CreateSubmissionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CreateSubmissionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
