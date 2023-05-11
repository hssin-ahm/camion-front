import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { DriverComponent } from './driver.component';
import { DriverListComponent } from './pages/driver-list/driver-list.component';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { DriversEffects } from './state/driver.effects';
import { DriverReducer } from './state/driver.reducer';
import { DRIVER_STATE_NAME } from './state/driver.selector';
import { PathModule } from 'src/app/shared/modules/path/path.module';
import { NgSelectModule } from '@ng-select/ng-select';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule } from '@angular/forms';
import { FeahterIconModule } from 'src/app/core/feather-icon/feather-icon.module';

const routes: Routes = [
  {
    path: '',
    component: DriverComponent,
    children: [
      {
        path: '',
        component: DriverListComponent,
      },
      {
        path: 'driver',
        loadChildren: () =>
          import('./pages/driver-details/driver-details.module').then(
            (m) => m.DriverDetailsModule
          ),
      },
    ],
  },
];

@NgModule({
  declarations: [DriverComponent, DriverListComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    EffectsModule.forFeature([DriversEffects]),
    StoreModule.forFeature(DRIVER_STATE_NAME, DriverReducer),
    PathModule,
    NgbModule,
    NgSelectModule,
    FormsModule,
    FeahterIconModule,
  ],
})
export class DriverModule {}
