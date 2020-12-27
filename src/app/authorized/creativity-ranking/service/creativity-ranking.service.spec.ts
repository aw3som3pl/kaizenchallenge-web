import { TestBed } from '@angular/core/testing';

import { CreativityRankingService } from './creativity-ranking.service';

describe('CreativityRankingService', () => {
  let service: CreativityRankingService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CreativityRankingService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
