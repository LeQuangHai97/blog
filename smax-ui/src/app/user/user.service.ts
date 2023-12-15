import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CreateOrUpdateUser } from '../register/create-or-update-user';
import { BehaviorSubject, Observable } from 'rxjs';
import { JwtHelperService } from '@auth0/angular-jwt';
import { User } from './user'
@Injectable({
  providedIn: 'root',
})
export class UserService {
  private apiUrl = 'http://localhost:3000';
  constructor(private http: HttpClient, private jwtHelper: JwtHelperService) {}

  create(user: CreateOrUpdateUser) {
    return this.http.post(`${this.apiUrl}/auth/signup`, user);
  }

  getUserById(userId: string, token: string): Observable<any> {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });
    return this.http.get(`${this.apiUrl}/${userId}`, { headers });
  }
  // getById(id: string) {
  //   return this.http.get<User>(`${this.apiUrl}/user/${id}`);
  // }

  // getProfile(): Observable<any> {
  //   return this.http.get(`${this.apiUrl}/me`);
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
