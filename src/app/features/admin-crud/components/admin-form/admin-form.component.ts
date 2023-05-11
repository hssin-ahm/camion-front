import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { AppState } from 'src/app/store/app.state';
import {
  changeaAtuelBreadcrumb,
  setLoadingSpinner,
} from 'src/app/store/shared/shared.action';
import { Admin } from '../../models/admin.interface';
import {
  addAdmin,
  getSingleAdmin,
  updateAdmin,
} from '../../state/admin.actions';
import { getSigleAdminSelector } from '../../state/admin.selector';

@Component({
  selector: 'app-admin-form',
  templateUrl: './admin-form.component.html',
  styleUrls: ['./admin-form.component.scss'],
})
export class AdminFormComponent implements OnInit {
  constructor(private store: Store<AppState>, private ar: ActivatedRoute) {}
  admin$: Observable<Admin> | null;

  admin;
  itemActive: string = 'Add admin';
  admin_id;

  ngOnInit(): void {
    this.admin_id = this.ar.snapshot.params['id'];
    if (this.admin_id) {
      this.getadmin();
      this.itemActive = 'Update admin';
    }
    this.changeBreadcrumb();
  }

  getadmin() {
    this.store.dispatch(getSingleAdmin({ id: this.admin_id }));
    this.admin$ = this.store.select(getSigleAdminSelector);

    this.admin$.subscribe((data: any) => {
      this.admin = data;
    });
  }

  changeBreadcrumb() {
    this.store.dispatch(
      changeaAtuelBreadcrumb({
        item: 'Admins',
        itemActive: this.itemActive,
      })
    );
  }

  submit(form: NgForm) {
    const admin = form.value;
    if (admin.role != 'admin') {
      admin.role = 'admin';
    }

    if (admin._id) {
      this.store.dispatch(setLoadingSpinner({ status: true }));
      this.store.dispatch(updateAdmin({ admin }));
    } else {
      admin._id = undefined;
      this.store.dispatch(setLoadingSpinner({ status: true }));
      this.store.dispatch(addAdmin({ admin }));
    }
    console.log(admin);
  }
}
