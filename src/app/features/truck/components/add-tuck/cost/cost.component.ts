import { Component, Input, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { ColumnMode } from '@swimlane/ngx-datatable';
import { Observable } from 'rxjs';
import { AppState } from 'src/app/store/app.state';
import { changeaAtuelBreadcrumb } from 'src/app/store/shared/shared.action';
import { Cost } from '../../../models/cost.interface';
import { getCosts, getTotalPrice } from '../state/add_truck.action';
import {
  getCostsSelector,
  getTotalPriceSelector,
} from '../state/add_truck.selector';

@Component({
  selector: 'app-cost',
  templateUrl: './cost.component.html',
  styleUrls: ['./cost.component.scss'],
})
export class CostComponent implements OnInit {
  @Input('truck_id') truck_id: string | null;
  costs$: Observable<any>;

  // costs = [];
  total_price$: Observable<number>;

  page = 1;
  limit = 5;
  searchPagination = false;

  constructor(private store: Store<AppState>) {}

  ngOnInit(): void {
    this.getCosts(this.page, this.limit);
    this.setTotalPrice();
    this.changeBreadcrumb();
  }

  getCosts(page, limit) {
    this.store.dispatch(getCosts({ truck_id: this.truck_id, page, limit }));
    this.costs$ = this.store.select(getCostsSelector);
  }
  changeBreadcrumb() {
    this.store.dispatch(
      changeaAtuelBreadcrumb({
        item: 'Trucks',
        itemActive: 'Cost List',
      })
    );
  }
  done() {
    this.getCosts(this.page, this.limit);
  }

  setTotalPrice() {
    this.store.dispatch(getTotalPrice({ truck_id: this.truck_id }));
    this.total_price$ = this.store.select(getTotalPriceSelector);
  }
}
