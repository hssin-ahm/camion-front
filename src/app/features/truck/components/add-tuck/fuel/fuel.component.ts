import { Component, Input, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/store/app.state';
import { checkFuelData } from './state/fuel.action';
import { checkFuelsData } from './state/fuel.selector';

@Component({
  selector: 'app-fuel',
  templateUrl: './fuel.component.html',
})
export class FuelComponent implements OnInit {
  @Input('truck_id') truck_id: string | null;
  fuel_id?;
  toggle: boolean;
  disable_icon: boolean = null;

  constructor(private store: Store<AppState>) {}

  ngOnInit(): void {
    this.store.dispatch(checkFuelData({ truck_id: this.truck_id }));
    this.store.select(checkFuelsData).subscribe((result: boolean) => {
      if (result) {
        this.toggle = false;
        this.disable_icon = false;
      } else {
        this.toggle = true;
        this.disable_icon = true;
      }
    });
  }

  fuelToggle(toggle) {
    this.toggle = toggle[0];
    this.fuel_id = toggle[1];
  }
}
