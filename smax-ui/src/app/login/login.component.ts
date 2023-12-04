import { Component, OnInit } from '@angular/core';
import { UserService } from '../service/user.service';
import { Router } from '@angular/router';
import { LoginUser } from './login-user';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  constructor(private userService: UserService, private router: Router) {}

  ngOnInit(): void {
    // throw new Error('Method not implemented.');
  }

  user: LoginUser = {
    username: '',
    password: '',
  };

  login() {
    this.userService.login(this.user).subscribe(() => {
      console.log(this.user);
      this.router.navigate(['/']);
    });
  }
}
