import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { ListOfTruckComponent } from './components/list-of-truck/list-of-truck.component';
import { EffectsModule } from '@ngrx/effects';
import { TrucksEffects } from './state/truck.effects';
import { TRUCK_STATE_NAME } from './state/truck.selector';
import { StoreModule } from '@ngrx/store';
import { TruckReducer } from './state/truck.reducer';
import { FeahterIconModule } from 'src/app/core/feather-icon/feather-icon.module';
import { NgbModule, NgbPagination } from '@ng-bootstrap/ng-bootstrap';
import { MatTabsModule } from '@angular/material/tabs';

import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { FormsModule } from '@angular/forms';
import { PathModule } from 'src/app/shared/modules/path/path.module';
import { NgSelectModule } from '@ng-select/ng-select';
import { TruckComponent } from './truck.component';
import { TruckTrackingComponent } from './components/truck-tracking/truck-tracking.component';

const routes: Routes = [
  {
    path: '',
    component: TruckComponent,
    children: [
      {
        path: '',
        component: ListOfTruckComponent,
      },
      {
        path: 'add',
        loadChildren: () =>
          import('./components/add-tuck/add-truck.module').then(
            (m) => m.AddTruckModule
          ),
      },
      {
        path: 'tracking',
        component: TruckTrackingComponent,
      },
      {
        path: 'tracking/:id',
        component: TruckTrackingComponent,
      },
    ],
  },
];

@NgModule({
  declarations: [TruckComponent, ListOfTruckComponent, TruckTrackingComponent],
  imports: [
    CommonModule,
    FormsModule,
    RouterModule.forChild(routes),
    EffectsModule.forFeature([TrucksEffects]),
    StoreModule.forFeature(TRUCK_STATE_NAME, TruckReducer),
    FeahterIconModule,
    NgbModule,
    NgxDatatableModule,
    PathModule,
    NgSelectModule,
    MatTabsModule,
  ],
})
export class TruckModule {}
