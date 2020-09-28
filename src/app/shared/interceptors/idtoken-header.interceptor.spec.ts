import { TestBed } from '@angular/core/testing';

import { IdtokenHeaderInterceptor } from './idtoken-header.interceptor';

describe('IdtokenHeaderInterceptor', () => {
  beforeEach(() => TestBed.configureTestingModule({
    providers: [
      IdtokenHeaderInterceptor
      ]
  }));

  it('should be created', () => {
    const interceptor: IdtokenHeaderInterceptor = TestBed.inject(IdtokenHeaderInterceptor);
    expect(interceptor).toBeTruthy();
  });
});
