import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { finalize, Observable } from 'rxjs';
import { LoandingServicesService } from '../services/loanding-services.service';

@Injectable()
export class LoandingInterceptorInterceptor implements HttpInterceptor {

  constructor(private loandingServicesService: LoandingServicesService) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    this.loandingServicesService.setLoanding(true);
    return next.handle(request).pipe(
      finalize(() => this.loandingServicesService.setLoanding(false))
    );
  }
}
