import { Component, OnInit } from '@angular/core';
import { CreateOrUpdateSmax } from '../create-or-update-smax';
import { SmaxService } from '../smax.service';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/auth/auth.service';
import { UserService } from 'src/app/service/user.service';

@Component({
  selector: 'app-add-smax',
  templateUrl: './add-smax.component.html',
  styleUrls: ['./add-smax.component.css'],
})
export class AddSmaxComponent implements OnInit {
  constructor(
    private smaxService: SmaxService,
    private authService: AuthService,
    private userService: UserService,
    private router: Router
  ) {}
  currentUser: any;

  smaxs: CreateOrUpdateSmax = {
    franchise: '',
    imageUrl: '',
    name: '',
    powers: '',
    // authorId: '',
  };

  ngOnInit(): void {
  }

  create() {
    if (this.smaxService) {
      this.smaxService.create(this.smaxs).subscribe(() => {
        this.router.navigate(['/']);
      });
    } else {
      console.error('SmaxService is undefined.');
    }
  }
}
