import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent implements OnInit {
  isLoggedIn$ = this.authService.isLoggedIn;
  currentUser: any;
  constructor(private authService: AuthService) {}
  ngOnInit(): void {
    this.authService.isLoggedIn.subscribe((loggedIn) => {
      if (loggedIn) {
        // Đã đăng nhập, cập nhật thông tin người dùng
        const storedUser = localStorage.getItem('currentUser');

        if (storedUser !== null) {
          this.currentUser = JSON.parse(storedUser);
        } else {
          // Xử lý trường hợp 'currentUser' không tồn tại trong localStorage
          console.error('No user information found in localStorage.');
        }
      } else {
        // Đã đăng xuất, xóa thông tin người dùng
        this.currentUser = null;
      }
    });
  }
}
