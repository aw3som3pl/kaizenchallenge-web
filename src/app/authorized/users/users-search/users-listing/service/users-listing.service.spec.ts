import { TestBed } from '@angular/core/testing';

import { UsersListingService } from './users-listing.service';

describe('UsersListingService', () => {
  let service: UsersListingService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UsersListingService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
