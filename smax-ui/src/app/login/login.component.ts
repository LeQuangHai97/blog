import { Component, OnInit } from '@angular/core';
import { UserService } from '../service/user.service';
import { Router } from '@angular/router';
import { LoginUser } from './login-user';
import { AuthService } from '../auth/auth.service';
import { AuthResponse } from '../interface/auth-response.interface';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  loginError: string | null = null;
  constructor(
    private userService: UserService,
    private router: Router,
    private authService: AuthService,
    private formBuilder: FormBuilder
  ) {
  }

  ngOnInit(): void {
    // throw new Error('Method not implemented.');
  }

  user: LoginUser = {
    username: '',
    password: '',
  };

  login() {
    this.authService.login(this.user).subscribe(
      (response) => {
        console.log(response.message);
        this.authService.isLoggedIn$.next(true);
        this.router.navigate(['/']);
      },
      (error) => {
        console.error('Login failed', error);

        // Xử lý và hiển thị thông báo lỗi
        this.handleLoginError(error);
      }
    );
  }

  private handleLoginError(error: any) {
    // Xử lý và hiển thị thông báo lỗi dựa vào nội dung lỗi
    if (error.status === 401) {
      // Unauthorized: Đăng nhập không thành công, hiển thị thông báo lỗi
      this.loginError = 'Tài khoản hoặc mật khẩu không hợp lệ !';
    } else {
      // Xử lý các tình huống lỗi khác nếu cần
      this.loginError = 'An error occurred during login.';
    }
  }
}
