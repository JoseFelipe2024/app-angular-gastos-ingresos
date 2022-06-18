import { TestBed } from '@angular/core/testing';

import { HttpClientIgnoreInterceptorService } from './http-client-ignore-interceptor.service';

describe('HttpClientIgnoreInterceptorService', () => {
  let service: HttpClientIgnoreInterceptorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HttpClientIgnoreInterceptorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
