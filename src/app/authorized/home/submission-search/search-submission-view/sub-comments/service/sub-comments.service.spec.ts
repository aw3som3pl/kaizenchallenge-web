import { TestBed } from '@angular/core/testing';

import { SubCommentsService } from './sub-comments.service';

describe('SubSommentsService', () => {
  let service: SubCommentsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SubCommentsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
