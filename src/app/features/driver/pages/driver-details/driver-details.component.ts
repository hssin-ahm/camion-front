import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { AppState } from 'src/app/store/app.state';
import { Driver } from '../../models/driver.interface';
import {
  getSingleDriver,
  selectedTabDriver,
} from './state/driver-details.actions';
import {
  getSigleDriverSelector,
  getTabSelectedNumForDriverDetails,
} from './state/driver-details.selector';
import { Location } from '@angular/common';

@Component({
  selector: 'app-driver-details',
  templateUrl: './driver-details.component.html',
})
export class DriverDetailsComponent implements OnInit {
  index: number;
  driver_id: string;
  driver$: Observable<Driver> | null;

  tabs = [0];
  selected = new FormControl([0]);
  constructor(
    private store: Store<AppState>,
    private ar: ActivatedRoute,
    private location: Location
  ) {}

  ngOnInit(): void {
    this.driver_id = this.ar.snapshot.params['id'];
    if (this.driver_id) {
      this.getDriver();
    }
  }

  getDriver() {
    this.store.dispatch(getSingleDriver({ id: this.driver_id }));
    this.driver$ = this.store.select(getSigleDriverSelector);

    this.driver$.subscribe((data) => {
      if (data) {
        this.driver_id = this.ar.snapshot.params['id'];
        this.redirect(this.driver_id);
      } else {
        this.driver_id = undefined;
      }
    });
  }

  redirect(id) {
    this.store.select(getTabSelectedNumForDriverDetails).subscribe((num) => {
      this.selected.setValue(num);
      this.switchUrl(num, id);
    });
  }

  switchUrl(index, id) {
    switch (index) {
      case 1:
        this.location.go(`drivers/driver/${id}/history`);
        break;
      default:
        this.location.go(`drivers/driver/${id}`);
        break;
    }
  }

  selectedIndexChange($event) {
    const tab_number: number = $event;

    this.store.dispatch(selectedTabDriver({ tab_number }));
  }
}
