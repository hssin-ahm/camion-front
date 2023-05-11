import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { AppState } from 'src/app/store/app.state';
import { TruckStatusData } from '../../models/truckStatusData.interface';
import { truckStatusStart } from '../../state/dashboard.actions';
import { getTruckStatusServiceSelector } from '../../state/dashboard.selector';

@Component({
  selector: 'app-truck-status',
  templateUrl: './truck-status.component.html',
  styleUrls: ['./truck-status.component.scss'],
})
export class TruckStatusComponent implements OnInit {
  totalActiveTruck;
  totalInShopTruck;
  totalInactiveTruck;

  constructor(private store: Store<AppState>) {}

  ngOnInit(): void {
    this.store.dispatch(truckStatusStart());

    this.store.select(getTruckStatusServiceSelector).subscribe((data) => {
      this.totalActiveTruck = data?.totalActiveTruck;
      this.totalInShopTruck = data?.totalInShopTruck;
      this.totalInactiveTruck = data?.totalInactiveTruck;
    });
  }
}
