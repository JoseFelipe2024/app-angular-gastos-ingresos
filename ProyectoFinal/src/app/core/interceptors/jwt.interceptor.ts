import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse,
} from '@angular/common/http';
import { catchError, EMPTY, Observable, retry, throwError } from 'rxjs';
import { AuthService } from '../services/auth.service';
import { ToastrService } from 'ngx-toastr';
import { JwtHelperService } from '@auth0/angular-jwt';
import { use } from 'echarts';
import { environment } from 'src/environments/environment';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {
  constructor(
    private auth: AuthService,
    private toastrService: ToastrService,
    private jwtHelperService: JwtHelperService
  ) {}

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    const user = this.auth.getUser();
    console.log((process?.env as any)?.Apikey)
    if (user?.token) {
      const isExpired = this.jwtHelperService.isTokenExpired(user?.token);
      if (isExpired) {
        this.auth.logout();
        this.toastrService.error('Tu sesión ha expirado, vuelve a inicial sesión');
        return EMPTY;
      }
      request = request.clone({
        setHeaders: {
          authorization: `Bearer ${user.token}`,
        },
      });
    }
    return next.handle(request).pipe(
      catchError((response: HttpErrorResponse) => {
        if (response.status === 401) {
          this.auth.logout();
        }
        return throwError(response);
      })
    );
  }
}
