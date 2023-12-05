import { Component, OnInit } from '@angular/core';
import { UserService } from '../service/user.service';
import { Router } from '@angular/router';
import { LoginUser } from './login-user';
import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  constructor(
    private userService: UserService,
    private router: Router,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    // throw new Error('Method not implemented.');
  }

  user: LoginUser = {
    username: '',
    password: '',
  };

  login() {
    this.userService.login(this.user).subscribe(() => {
      this.authService.isLoggedIn$.next(true);
      console.log(this.user);
      this.router.navigate(['/']);
    });
  }
}
