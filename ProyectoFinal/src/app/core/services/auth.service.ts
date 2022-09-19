import { HttpBackend, HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, delay, map, mergeMap, Observable, of, retryWhen, scan, take, tap, throwError } from 'rxjs';
import { ApiResponse } from 'src/app/shared/models/apiResponse.model';
import { LoginModel } from 'src/app/shared/models/Login.model';
import { User } from 'src/app/shared/models/user.model';
import { UserAuth } from 'src/app/shared/models/userAuth.model';
import { environment } from 'src/environments/environment';
import { HttpClientIgnoreInterceptorService } from './http-client-ignore-interceptor.service';
import { LocalStorageService } from './local-storage.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private currentUser: UserAuth = this.LocalStorageService.getItem('user');
  private readonly api_url = environment.API_URL;
  private userAuth: BehaviorSubject<UserAuth> = new BehaviorSubject<UserAuth>(
    this.currentUser
  );

  constructor(
    private LocalStorageService: LocalStorageService,
    private http: HttpClient,
    private router: Router,
    private httpClientCustom: HttpClientIgnoreInterceptorService
  ) { }

  existEmail(email: string): Observable<ApiResponse<boolean>> {
    return this.httpClientCustom.httpClientCustom.get<ApiResponse<boolean>>(`${this.api_url}/Users/ExistEmail?email=${email}`)
      .pipe(
        retryWhen(errors => errors.pipe(delay(500), take(4)))
      );;
  }

  login(loginModel: LoginModel): Observable<ApiResponse<UserAuth>> {
    return this.http.post<ApiResponse<UserAuth>>(`${this.api_url}/Auth`, loginModel)
      .pipe(
        retryWhen(error => {
          return error.pipe(
            mergeMap(error => {
              if (error.status !== 401) {
                  return of(error);
              }
              return throwError(error);
           }),
              delay(500), take(2)
          );
      }),
      );;
  }

  createUser(user: User): Observable<ApiResponse<number>> {
    return this.http.post<ApiResponse<number>>(`${this.api_url}/Users`, user);
  }

  isAutehticated(): Observable<boolean> {
    return this.userAuth.asObservable().pipe(map((user) => user != null));
  }

  setUserAuth(user: UserAuth): void {
    this.LocalStorageService.setItem('user', user);
    this.userAuth.next(user);
  }

  getUser(): UserAuth {
    return this.LocalStorageService.getItem('user');
  }

  getUserAuth(): Observable<UserAuth> {
    return this.userAuth.asObservable();
  }

  logout(): void {
    this.LocalStorageService.removeItem('user');
    this.userAuth.next(null!);
    this.router.navigate(['/auth/login']);
  }


}
