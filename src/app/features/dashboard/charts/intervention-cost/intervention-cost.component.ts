import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Intervention } from 'src/app/features/truck/models/intervention.interface';
import { AppState } from 'src/app/store/app.state';
import { getInterventionCostStart } from '../../state/dashboard.actions';
import { getInterventionCostSelector } from '../../state/dashboard.selector';
import { getChartOptions, OBJ } from '../chartObtions';

@Component({
  selector: 'app-intervention-cost',
  templateUrl: './intervention-cost.component.html',
  styleUrls: ['./intervention-cost.component.scss'],
})
export class InterventionCostComponent implements OnInit {
  public interventionCostChartOptions: any = {};

  // colors and font variables for apex chart
  obj = OBJ;

  interventions: Observable<Intervention[]>;

  interventionPrice: number[] = [];
  dates = [];

  totalInterventionPrice = 0;

  constructor(private store: Store<AppState>) {}

  ngOnInit(): void {
    this.store.dispatch(getInterventionCostStart());

    this.interventions = this.store.select(getInterventionCostSelector);

    this.interventions.subscribe((interventions: any) => {
      if (interventions?.data) {
        this.interventionPrice = interventions?.data.map(
          (intervention: Intervention) => +intervention?.price
        );
        this.dates = interventions?.data.map(
          (intervention: Intervention) => intervention?.date
        );
        this.totalInterventionPrice = this.getTotalinterventionPrice();
      }
      this.interventionCostChartOptions = getChartOptions(
        this.obj,
        this.interventionPrice,
        this.dates,
        'line'
      );
    });
  }

  changeChart(type) {
    this.interventionCostChartOptions = getChartOptions(
      this.obj,
      this.interventionPrice,
      this.dates,
      type
    );
  }
  getTotalinterventionPrice(): number {
    return this.interventionPrice.reduce((a, b) => a + b);
  }
}
