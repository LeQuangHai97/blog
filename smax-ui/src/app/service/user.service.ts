import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CreateOrUpdateSmax } from '../smax/create-or-update-smax';
import { CreateOrUpdateUser } from '../register/create-or-update-user';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http:HttpClient) {}

  create(user:CreateOrUpdateUser) {
    return this.http.post("http://localhost:3000/users/signup",user);
  }

}
