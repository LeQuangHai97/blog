import { Component, OnInit } from '@angular/core';
import { UserService } from '../service/user.service';
import { Router } from '@angular/router';
import { CreateOrUpdateUser } from './create-or-update-user';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['../login/login.component.css'],
})
export class RegisterComponent implements OnInit {

  constructor(private userService: UserService, private router: Router) {}

  user: CreateOrUpdateUser = {
    username: '',
    email: '',
    password: '',
    role: '',
    // area: '',
    // permissions: 0,
  };

  ngOnInit(): void {}

  create() {
    this.userService.create(this.user).subscribe(() => {
      this.router.navigate(['/login']);
    });
  }
}
