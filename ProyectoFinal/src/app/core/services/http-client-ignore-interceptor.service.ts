import { HttpBackend, HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class HttpClientIgnoreInterceptorService {
  private readonly http!: HttpClient;

  constructor(private httpBackend: HttpBackend) {
    this.http = new HttpClient(this.httpBackend);
  }

  get httpClientCustom(): HttpClient {
    return this.http;
  }
  
}