import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { LoginUser } from '../login/login-user';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private baseUrl = 'http://localhost:3000';

  isLoggedIn$ = new BehaviorSubject<boolean>(false);

  get isLoggedIn(): Observable<boolean> {
    return this.isLoggedIn$.asObservable();
  }

  constructor(private http: HttpClient) {}

  login(user: LoginUser) {
    this.isLoggedIn$.next(true);
    return this.http.post(`${this.baseUrl}/auth/login`, user);
  }

  logout(): Observable<any> {
    this.isLoggedIn$.next(false);
    return this.http.post(`${this.baseUrl}/auth/logout`, {});
  }
}