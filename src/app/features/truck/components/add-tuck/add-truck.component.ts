import { Component, Input, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/store/app.state';
import { getSingleTruck, selectedTab } from './state/add_truck.action';
import {
  getTabNumber,
  getTruck,
  getTruck_id,
} from './state/add_truck.selector';
import { Location } from '@angular/common';
import { Truck } from '../../models/truck.interface';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-add-truck',
  templateUrl: './add-truck.component.html',
})
export class AddTruckComponent implements OnInit {
  item: string = 'Trucks';

  tabs = [0];
  selected = new FormControl([0]);

  index: number;
  truck_id: string;
  truck$: Observable<Truck> | null;

  constructor(
    private store: Store<AppState>,
    private ar: ActivatedRoute,
    private location: Location
  ) {}

  ngOnInit(): void {
    this.truck_id = this.ar.snapshot.params['id'];
    if (this.truck_id) {
      this.getTruck();
    }
  }

  getTruck() {
    this.store.dispatch(getSingleTruck({ id: this.truck_id }));
    this.truck$ = this.store.select(getTruck);

    this.truck$.subscribe((data) => {
      if (data) {
        this.truck_id = this.ar.snapshot.params['id'];
        this.redirect(this.truck_id);
      } else {
        this.truck_id = undefined;
      }
    });
  }

  redirect(id) {
    this.store.select(getTabNumber).subscribe((num) => {
      this.selected.setValue(num);
      this.switchUrl(num, id);
    });
  }

  switchUrl(index, id) {
    switch (index) {
      case 1:
        this.location.go(`trucks/add/${id}/contract`);
        break;
      case 2:
        this.location.go(`trucks/add/${id}/intervention`);
        break;
      case 3:
        this.location.go(`trucks/add/${id}/fuel`);
        break;
      case 4:
        this.location.go(`trucks/add/${id}/cost`);
        break;
      default:
        this.location.go(`trucks/add/${id}`);
        break;
    }
  }
  selectedIndexChange($event) {
    const tab_number: number = $event;
    this.store.dispatch(selectedTab({ tab_number }));
  }
}
