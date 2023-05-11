import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Fuel } from 'src/app/features/truck/models/fuel.interface';
import { AppState } from 'src/app/store/app.state';
import { getFuelCostStart } from '../../state/dashboard.actions';
import { getFuelCostSelector } from '../../state/dashboard.selector';
import { getChartOptions, OBJ } from '../chartObtions';

@Component({
  selector: 'app-fuel-cost',
  templateUrl: './fuel-cost.component.html',
  styleUrls: ['./fuel-cost.component.scss'],
})
export class FuelCostComponent implements OnInit {
  public fuelCostChartOptions: any = {};

  // colors and font variables for apex chart
  obj = OBJ;

  fuels: Observable<Fuel[]>;

  fuelPrice: number[] = [];
  dates = [];

  totalFuelPrice = 0;

  constructor(private store: Store<AppState>) {}

  ngOnInit(): void {
    this.store.dispatch(getFuelCostStart());

    this.fuels = this.store.select(getFuelCostSelector);

    this.fuels.subscribe((fuels: any) => {
      if (fuels?.data) {
        this.fuelPrice = fuels?.data.map((fuel: Fuel) => +fuel?.price_total);
        this.dates = fuels?.data.map((fuel: Fuel) => fuel?.date);
        this.totalFuelPrice = this.getTotalFuelPrice();
      }
      this.fuelCostChartOptions = getChartOptions(
        this.obj,
        this.fuelPrice,
        this.dates,
        'bar'
      );
    });
  }
  getTotalFuelPrice(): number {
    return this.fuelPrice.reduce((a, b) => a + b);
  }
  changeChart(type) {
    this.fuelCostChartOptions = getChartOptions(
      this.obj,
      this.fuelPrice,
      this.dates,
      type
    );
  }
}
