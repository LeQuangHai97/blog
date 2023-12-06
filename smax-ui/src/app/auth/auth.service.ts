import { JwtHelperService } from '@auth0/angular-jwt';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, tap } from 'rxjs';
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

  constructor(private http: HttpClient, private jwtHelper: JwtHelperService) {}

  login(user: LoginUser) {
    this.isLoggedIn$.next(true);
    return this.http.post(`${this.baseUrl}/auth/login`, user);
  }

  // login(user: LoginUser): Observable<any> {
  //   return this.http.post<any>(`${this.baseUrl}/auth/login`, user).pipe(
  //     tap((response) => {
  //       const { access_token } = response;
  //       const decodedToken = this.jwtHelper.decodeToken(access_token);
  //       // Lưu thông tin người dùng vào local storage hoặc biến trạng thái
  //       localStorage.setItem('currentUser', JSON.stringify(decodedToken));
  //       this.isLoggedIn$.next(true);
  //     })
  //   );
  // }

  logout(): Observable<any> {
    this.isLoggedIn$.next(false);
    return this.http.post(`${this.baseUrl}/auth/logout`, {});
  }
}
