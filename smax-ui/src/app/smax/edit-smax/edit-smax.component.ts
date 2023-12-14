import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SmaxService } from '../smax.service';
import { CreateOrUpdateSmax } from '../create-or-update-smax';

@Component({
  selector: 'app-edit-smax',
  templateUrl: './edit-smax.component.html',
  styleUrls: ['./edit-smax.component.css'],
})
export class EditSmaxComponent implements OnInit {
  constructor(
    private route: ActivatedRoute,
    private smaxSerivce: SmaxService,
    private router: Router
  ) {}

  itemId: string = '';

  smaxs: CreateOrUpdateSmax = {
    franchise: '',
    imageUrl: '',
    name: '',
    powers: '',
    // authorId: ''
  };

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      this.itemId = params.get('id') ?? '';
      this.getById();
    });
  }

  getById() {
    this.smaxSerivce.getById(this.itemId).subscribe((data) => {
      this.smaxs.franchise = data.franchise;
      this.smaxs.imageUrl = data.imageUrl;
      this.smaxs.name = data.name;
      this.smaxs.powers = data.powers;
    });
  }

  update() {
    this.smaxSerivce.update(this.itemId, this.smaxs).subscribe(() => {
      this.router.navigate(['/']);
    });
  }
}
