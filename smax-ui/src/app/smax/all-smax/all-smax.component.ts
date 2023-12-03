import { Component, OnInit } from '@angular/core';
import { SmaxService } from '../smax.service';
import { Smax } from '../smax';

declare var window: any;

@Component({
  selector: 'app-all-smax',
  templateUrl: './all-smax.component.html',
  styleUrls: ['./all-smax.component.css'],
})
export class AllSmaxComponent implements OnInit {
  constructor(private smaxService: SmaxService) {}

  smaxs: Smax[] = [];
  deleteModal: any;
  itemToDelete: string = '';

  ngOnInit(): void {
    this.deleteModal = new window.bootstrap.Modal(
      document.getElementById('deleteModal')
    );
    this.getAll();
  }

  openDeletePopup(id: string) {
    this.itemToDelete = id;
    this.deleteModal.show();
  }

  getAll() {
    this.smaxService.get().subscribe((data) => {
      this.smaxs = data;
    });
  }

  delete() {
    this.smaxService.delete(this.itemToDelete)
    .subscribe(() => {
      this.smaxs = this.smaxs.filter(_ => _._id !== this.itemToDelete);
      this.deleteModal.hide();
    });
  }
}
