import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { JwtHelperService } from '@auth0/angular-jwt';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent implements OnInit {
  isLoggedIn$ = this.authService.isLoggedIn;
  currentUser: any;
  username: string | null = '';

  constructor(
    private authService: AuthService,
    private jwtHelper: JwtHelperService
  ) {}

  ngOnInit(): void {
    this.authService.isLoggedIn.subscribe((loggedIn) => {
      if (loggedIn) {
        // Đã đăng nhập, cập nhật thông tin người dùng
        const currentUserString = localStorage.getItem('currentUser');
        if (currentUserString !== null) {
          const currentUser = JSON.parse(currentUserString);
          this.username = currentUser.username;
        }
      }
    });
  }
}
