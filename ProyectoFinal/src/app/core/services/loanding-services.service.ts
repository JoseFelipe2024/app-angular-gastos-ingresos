import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable()
export class LoandingServicesService {
  private loanding$ = new BehaviorSubject<boolean>(false);
  
  constructor() { }

  setLoanding(error: boolean): void {
    this.loanding$.next(error);
  }

  getLoanding(): Observable<boolean> {
    return this.loanding$.asObservable();
  }

}