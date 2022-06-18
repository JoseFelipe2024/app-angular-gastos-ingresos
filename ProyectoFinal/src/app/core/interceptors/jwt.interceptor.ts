import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse
} from '@angular/common/http';
import { catchError, Observable, throwError } from 'rxjs';
import { AuthService } from '../services/auth.service';
import { ToastrService } from 'ngx-toastr';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {

  constructor(private auth: AuthService, private toastrService: ToastrService) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    const user = this.auth.getUser();
    if(user){
      request = request.clone({
        setHeaders: {
            authorization: `Bearer ${ user.token }`
        }
    });
    }
    return next.handle(request).pipe(
      catchError((response: HttpErrorResponse) => {
        if (response.status === 401) {
          this.auth.logout();
        }
        if (response.status === 500 || response.status === 500) {
          this.toastrService.error('Ups, algo salió mal en el servidor.');
        }
        return throwError(response);
      }
  ));
  }
}
