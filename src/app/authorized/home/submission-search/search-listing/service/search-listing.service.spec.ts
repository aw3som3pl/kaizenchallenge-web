import { TestBed } from '@angular/core/testing';

import { SearchListingService } from './search-listing.service';

describe('SearchListingService', () => {
  let service: SearchListingService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SearchListingService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
