import { JwtHelperService } from '@auth0/angular-jwt';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { LoginUser } from '../login/login-user';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private baseUrl = 'http://localhost:3000';

  isLoggedIn$ = new BehaviorSubject<boolean>(false);

  get isLoggedIn(): Observable<boolean> {
    return this.isLoggedIn$.asObservable();
  }

  constructor(
    private http: HttpClient,
    private jwtHelper: JwtHelperService,
    private router: Router
  ) {
    const storedUser = localStorage.getItem('currentUser');
    this.isLoggedIn$ = new BehaviorSubject<boolean>(!!storedUser);
  }

  login(user: LoginUser): Observable<any> {
    this.isLoggedIn$.next(true);
    return this.http.post(`${this.baseUrl}/auth/login`, user).pipe(
      tap(
        (response: any) => {
          if (response && response.access_token) {
            const { message, access_token, username } = response;
            localStorage.setItem('access_token', response.access_token);
            const decodedToken = this.jwtHelper.decodeToken(access_token);
            if (decodedToken) {
              localStorage.setItem('currentUser', JSON.stringify(decodedToken));
              this.isLoggedIn$.next(true);
            } else {
              console.error('Failed to decode token.');
            }
          } else {
            console.error('Invalid response format.');
          }
        },
        (error) => {
          console.error('Login failed', error);
          // Xử lý lỗi đăng nhập
        }
      )
    );
  }

  logout(): Observable<any> {
    localStorage.removeItem('currentUser');
    localStorage.removeItem('access_token');
    this.isLoggedIn$.next(false);
    this.router.navigate(['/']);
    return this.http.post(`${this.baseUrl}/auth/logout`, {});
  }
}
