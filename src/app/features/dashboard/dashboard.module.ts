import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { PathModule } from 'src/app/shared/modules/path/path.module';

// Ng-ApexCharts
import { NgApexchartsModule } from 'ng-apexcharts';
import { NgChartsModule } from 'ng2-charts';

import { FormsModule } from '@angular/forms';
import { FeahterIconModule } from 'src/app/core/feather-icon/feather-icon.module';
import { DashboardComponent } from './dashboard.component';
import {
  NgbDatepickerModule,
  NgbDropdownModule,
  NgbModule,
} from '@ng-bootstrap/ng-bootstrap';
import { TruckStatusComponent } from './charts/truck-status/truck-status.component';
import { EffectsModule } from '@ngrx/effects';
import { DashboardEffects } from './state/dashboard.effects';
import { DASHBOARD_STATE_NAME } from './state/dashboard.selector';
import { DashboardReducer } from './state/dashboard.reducer';
import { StoreModule } from '@ngrx/store';
import { FuelCostComponent } from './charts/fuel-cost/fuel-cost.component';
import { InterventionCostComponent } from './charts/intervention-cost/intervention-cost.component';
import { TotalCostComponent } from './charts/total-cost/total-cost.component';
import { MissionStatusComponent } from './charts/mission-status/mission-status.component';
import { MissionTableComponent } from './charts/mission-table/mission-table.component';
import { MissionsEffects } from '../mission/state/mission.effects';
import { MISSION_STATE_NAME } from '../mission/state/mission.selector';
import { MissionReducer } from '../mission/state/mission.reducer';

const routes: Routes = [
  {
    path: '',
    component: DashboardComponent,
  },
];

@NgModule({
  declarations: [
    DashboardComponent,
    TruckStatusComponent,
    FuelCostComponent,
    InterventionCostComponent,
    TotalCostComponent,
    MissionStatusComponent,
    MissionTableComponent,
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    EffectsModule.forFeature([DashboardEffects, MissionsEffects]),
    StoreModule.forFeature(DASHBOARD_STATE_NAME, DashboardReducer),
    StoreModule.forFeature(MISSION_STATE_NAME, MissionReducer),
    FormsModule,
    FeahterIconModule,
    NgbDropdownModule,
    NgbDatepickerModule,
    NgApexchartsModule,
    NgChartsModule, // Ng2-charts
    PathModule,
    NgbModule,
    NgbDropdownModule,
  ],
})
export class DashboardModule {}
