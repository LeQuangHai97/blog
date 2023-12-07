import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CreateOrUpdateUser } from '../register/create-or-update-user';
import { LoginUser } from '../login/login-user';
import { tap } from 'rxjs/operators';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private http: HttpClient, private jwtHelper: JwtHelperService) {}

  create(user: CreateOrUpdateUser) {
    return this.http.post('http://localhost:3000/auth/signup', user);
  }

  // login(user: LoginUser) {
  //   return this.http.post('http://localhost:3000/login', user).pipe(
  //     tap(
  //       (response: any) => {
  //         if (response && response.access_token) {
  //           const { access_token, message } = response;
  //           const decodedToken = this.jwtHelper.decodeToken(access_token);
  //           if (decodedToken) {
  //             localStorage.setItem('currentUser', JSON.stringify(decodedToken));
  //           } else {
  //             console.error('Failed to decode token.');
  //           }
  //         } else {
  //           console.error('Invalid response format.');
  //         }
  //       },
  //       (error) => {
  //         console.error('Login failed', error);
  //         // Xử lý lỗi đăng nhập
  //       }
  //     )
  //   );
  // }
}
