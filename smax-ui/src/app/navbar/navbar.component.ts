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
        const storedUser = localStorage.getItem('currentUser');
        if (storedUser !== null) {
          this.currentUser = JSON.parse(storedUser);
        }
        if (this.username !== null) {
          this.username = localStorage.getItem('username');
        }
      } else {
        // Đã đăng xuất, xóa thông tin người dùng
        this.currentUser = null;
        this.username = null;
      }
    });
  }
}
