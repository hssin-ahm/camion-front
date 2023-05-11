import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/store/app.state';
import { getTotalCostStart } from '../../state/dashboard.actions';
import { getTotalCostSelector } from '../../state/dashboard.selector';
import {
  getRevenueChartOptions,
  getTotalCostChartOptions,
  OBJ,
} from '../chartObtions';

@Component({
  selector: 'app-total-cost',
  templateUrl: './total-cost.component.html',
  styleUrls: ['./total-cost.component.scss'],
})
export class TotalCostComponent implements OnInit {
  totals: any;
  public totalCostChartOptions: any = {};

  // colors and font variables for apex chart
  obj = OBJ;
  totalPrice: number[] = [];
  dates = [];
  totalcostPrice = 0;
  model = 'month';
  constructor(private store: Store<AppState>) {}

  ngOnInit(): void {
    this.getTotalCost();
  }
  getTotalCost() {
    this.store.dispatch(getTotalCostStart({ option: this.model }));

    this.store.select(getTotalCostSelector).subscribe((totals: any) => {
      if (totals?.data) {
        this.totalPrice = totals?.data.map((total: any) => +total?.price_total);
        this.dates = totals?.data.map((total: any) => total?.date);
        this.totalcostPrice = this.getTotalCostPrice();
        if (totals?.data.length != 1) {
          this.cleanTables();
        }
      } else {
        this.totalPrice = [];
        this.dates = [];
      }

      this.totalCostChartOptions = getTotalCostChartOptions(
        this.obj,
        this.totalPrice,
        this.dates,
        this.type
      );
    });
  }

  // total price
  getTotalCostPrice(): number {
    return this.totalPrice.reduce((a, b) => a + b);
  }
  type = 'bar';
  changeChart(type) {
    this.type = type;
    this.totalCostChartOptions = getTotalCostChartOptions(
      this.obj,
      this.totalPrice,
      this.dates,
      type
    );
  }
  cleanTables() {
    let count = 1;
    let day1 = this.dates[0].slice(0, 10);
    let newPriceTable = [];
    for (let index = 1; index < this.dates.length; index++) {
      const element: string = this.dates[index];
      let day = element.slice(0, 10);

      if (day1 == day) {
        count = count + 1;
      } else {
        let startIndex = index - count - 1;
        let endIndex = index - 1;
        if (startIndex == -1) {
          startIndex = 0;
        }
        let total = 0;
        for (let i = startIndex; i <= endIndex; i++) {
          const element = this.totalPrice[i];
          total = total + element;
        }
        newPriceTable.push(total);
        count = 0;
        day1 = element.slice(0, 10);
      }
      if (index + 1 == this.dates.length) {
        let startIndex = index - count;
        let endIndex = index;
        let total = 0;
        for (let i = startIndex; i <= endIndex; i++) {
          const element = this.totalPrice[i];
          total = total + element;
        }
        newPriceTable.push(total);
        count = 0;
      }
    }
    this.totalPrice = newPriceTable;

    let newDatesTable = [];
    new Set(this.dates).forEach((data) => {
      newDatesTable.push(data);
    });
    this.dates = newDatesTable;
  }
  changeOptions(option) {
    this.model = option;
    this.getTotalCost();
  }
}
