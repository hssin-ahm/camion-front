import { Component, Input, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { AppState } from 'src/app/store/app.state';
import { checkInterventionData } from './state/intervention.action';
import {
  checkInterventionsData,
  getToggleInterventionPage,
  getTruckInterventionsSelector,
} from './state/intervention.selector';

@Component({
  selector: 'app-intervention',
  templateUrl: './intervention.component.html',
})
export class InterventionComponent implements OnInit {
  @Input('truck_id') truck_id: string | null;
  intervention_id?;
  toggle: boolean;
  disable_icon: boolean = null;

  constructor(private store: Store<AppState>) {}

  ngOnInit(): void {
    this.store.dispatch(checkInterventionData({ truck_id: this.truck_id }));
    this.store.select(checkInterventionsData).subscribe((result: boolean) => {
      if (result) {
        this.toggle = false;
        this.disable_icon = false;
      } else {
        this.toggle = true;
        this.disable_icon = true;
      }
    });
  }

  interventionToggle(toggle) {
    this.toggle = toggle[0];
    this.intervention_id = toggle[1];
  }
}
