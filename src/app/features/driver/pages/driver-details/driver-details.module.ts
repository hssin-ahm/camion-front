import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DriverDetailsComponent } from './driver-details.component';
import { DriverFormComponent } from './driver-form/driver-form.component';
import { MissionHistoryComponent } from './mission-history/mission-history.component';
import { RouterModule, Routes } from '@angular/router';
import { MatTabsModule } from '@angular/material/tabs';
import { PathModule } from 'src/app/shared/modules/path/path.module';
import { EffectsModule } from '@ngrx/effects';
import { DriversDetailsEffects } from './state/driver-details.effects';
import { StoreModule } from '@ngrx/store';
import { DRIVER_DETAILs_STATE_NAME } from './state/driver-details.selector';
import { DriverDetailsReducer } from './state/driver-details.reducer';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxMaskModule } from 'ngx-mask';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { CustomFormsModule } from 'ngx-custom-validators';
import { NgSelectModule } from '@ng-select/ng-select';
import { FeahterIconModule } from 'src/app/core/feather-icon/feather-icon.module';

const routes: Routes = [
  {
    path: '',
    component: DriverDetailsComponent,
  },
  {
    path: ':id',
    component: DriverDetailsComponent,
  },
  {
    path: ':id/history',
    component: DriverDetailsComponent,
  },
];

@NgModule({
  declarations: [
    DriverDetailsComponent,
    DriverFormComponent,
    MissionHistoryComponent,
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    EffectsModule.forFeature([DriversDetailsEffects]),
    StoreModule.forFeature(DRIVER_DETAILs_STATE_NAME, DriverDetailsReducer),
    NgxMaskModule.forRoot({ validation: true }), // Ngx-mask
    MatTabsModule,
    FormsModule,
    NgSelectModule,
    PathModule,
    NgbModule,
    FeahterIconModule,
  ],
})
export class DriverDetailsModule {}
