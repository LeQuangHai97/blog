import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CreateOrUpdateUser } from '../register/create-or-update-user';
import { BehaviorSubject, Observable } from 'rxjs';
import { JwtHelperService } from '@auth0/angular-jwt';
import { User } from '../user/user'
@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private http: HttpClient, private jwtHelper: JwtHelperService) {}

  create(user: CreateOrUpdateUser) {
    return this.http.post('http://localhost:3000/auth/signup', user);
  }

  getById(id: string) {
    return this.http.get<User>(`http://localhost:3000/user/${id}`);
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

  private currentUserSubject: BehaviorSubject<any> = new BehaviorSubject<any>(null);

  // Public observable to subscribe to changes in the current user
  currentUser$: Observable<any> = this.currentUserSubject.asObservable();

  // Method to set the current user
  setCurrentUser(user: any): void {
    this.currentUserSubject.next(user);
  }

  // Method to get the current user's ID
  getCurrentUserId(): string {
    const currentUser = this.currentUserSubject.value;
    return currentUser ? currentUser.id : '';
  }
}
