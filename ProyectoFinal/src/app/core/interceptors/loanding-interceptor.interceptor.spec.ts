import { TestBed } from '@angular/core/testing';

import { LoandingInterceptorInterceptor } from './loanding-interceptor.interceptor';

describe('LoandingInterceptorInterceptor', () => {
  beforeEach(() => TestBed.configureTestingModule({
    providers: [
      LoandingInterceptorInterceptor
      ]
  }));

  it('should be created', () => {
    const interceptor: LoandingInterceptorInterceptor = TestBed.inject(LoandingInterceptorInterceptor);
    expect(interceptor).toBeTruthy();
  });
});
