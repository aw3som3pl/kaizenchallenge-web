import { TestBed } from '@angular/core/testing';

import { UsersDetailsService } from './users-details.service';

describe('UsersDetailsService', () => {
  let service: UsersDetailsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UsersDetailsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
