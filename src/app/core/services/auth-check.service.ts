import { BehaviorSubject, Observable } from 'rxjs';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AuthCheckService {
  constructor() {}

  authViaPhone$ = new BehaviorSubject<boolean>(false);

  getAuthViaPhone(): Observable<boolean> {
    return this.authViaPhone$.asObservable();
  }

  setAuthViaPhone(param: boolean): void {
    this.authViaPhone$.next(param);
  }
}
