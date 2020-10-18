import { TestBed } from '@angular/core/testing';

import { SubAttachmentsService } from './sub-attachments.service';

describe('SubAttachmentsService', () => {
  let service: SubAttachmentsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SubAttachmentsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
