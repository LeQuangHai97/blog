import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CreateOrUpdateUser } from '../register/create-or-update-user';
import { LoginUser } from '../login/login-user';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private http: HttpClient) {}

  create(user: CreateOrUpdateUser) {
    return this.http.post('http://localhost:3000/signup', user);
  }

  login(user: LoginUser) {
    return this.http.post('http://localhost:3000/login', user);
  }
}
