import { Component, OnInit } from '@angular/core';
import { CreateOrUpdateSmax } from '../create-or-update-smax';
import { SmaxService } from '../smax.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-smax',
  templateUrl: './add-smax.component.html',
  styleUrls: ['./add-smax.component.css']
})
export class AddSmaxComponent implements OnInit{
  constructor(private smaxService: SmaxService,
    private router:Router) {}

  smaxs: CreateOrUpdateSmax = {
    franchise: '',
    imageUrl: '',
    name: '',
    powers: '',
  }

  ngOnInit(): void {}

  create() {
    this.smaxService.create(this.smaxs).subscribe(() => {
      this.router.navigate(['/'])
    });
  }

}
