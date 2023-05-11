import { Component, Input, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/store/app.state';
import {
  changeaAtuelBreadcrumb,
  setLoadingSpinner,
} from 'src/app/store/shared/shared.action';
import { addDriver, updateDriver } from '../state/driver-details.actions';

@Component({
  selector: 'app-driver-form',
  templateUrl: './driver-form.component.html',
  styleUrls: ['./driver-form.component.scss'],
})
export class DriverFormComponent implements OnInit {
  @Input('driver') driver: any | null;
  buttonTooltip = 'Add driver';
  constructor(private store: Store<AppState>, private ar: ActivatedRoute) {}

  itemActive: string = 'Add driver';

  driver_id;

  ngOnInit(): void {
    this.driver_id = this.ar.snapshot.params['id'];
    if (this.driver_id) {
      this.itemActive = 'Update driver';
      this.buttonTooltip = 'Update driver';
    }
    this.changeBreadcrumb();
  }

  changeBreadcrumb() {
    this.store.dispatch(
      changeaAtuelBreadcrumb({
        item: 'Drivers',
        itemActive: this.itemActive,
      })
    );
  }

  submit(form: NgForm) {
    const driver = form.value;
    if (driver.role != 'driver') {
      driver.role = 'driver';
    }
    if (driver._id) {
      this.store.dispatch(setLoadingSpinner({ status: true }));
      this.store.dispatch(updateDriver({ driver }));
    } else {
      driver._id = undefined;
      this.store.dispatch(setLoadingSpinner({ status: true }));
      this.store.dispatch(addDriver({ driver }));
    }
  }
}
