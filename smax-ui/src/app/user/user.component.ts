import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from '../auth/auth.service';
import { UserService } from './user.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css'],
})
export class UserComponent implements OnInit {
  userId!: string;
  userData: any;
  constructor(
    private route: ActivatedRoute,
    private userService: UserService,
    private authService: AuthService
    ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.userId = params['id'];

      // Lấy token từ AuthService
      const token = this.authService.getToken();

      if (token) {
        // Gọi hàm để lấy thông tin người dùng dựa trên ID và token
        this.userService.getUserById(this.userId, token).subscribe((data) => {
          this.userData = data;
        });
      }
    });
  }
}
