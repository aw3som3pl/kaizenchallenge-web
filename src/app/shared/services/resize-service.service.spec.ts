import { TestBed } from '@angular/core/testing';
import {ResizeService} from './resize-service.service';

describe('ResizeServiceService', () => {
  let service: ResizeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ResizeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
