import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MissionListComponent } from './pages/mission-list/mission-list.component';
import { MissionFormComponent } from './pages/mission-form/mission-form.component';
import { RouterModule, Routes } from '@angular/router';
import { MissionComponent } from './mission.component';
import { EffectsModule } from '@ngrx/effects';
import { MissionsEffects } from './state/mission.effects';
import { StoreModule } from '@ngrx/store';
import { MISSION_STATE_NAME } from './state/mission.selector';
import { MissionReducer } from './state/mission.reducer';
import { PathModule } from 'src/app/shared/modules/path/path.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgSelectModule } from '@ng-select/ng-select';
import { FormsModule } from '@angular/forms';
import { FeahterIconModule } from 'src/app/core/feather-icon/feather-icon.module';
import { MissionHistoryComponent } from './pages/mission-history/mission-history.component';
import { MissionTrackingComponent } from './pages/mission-tracking/mission-tracking.component';

const routes: Routes = [
  {
    path: '',
    component: MissionListComponent,
  },
  {
    path: 'mission',
    component: MissionFormComponent,
  },
  {
    path: 'mission/:id',
    component: MissionFormComponent,
  },
  {
    path: 'history',
    component: MissionHistoryComponent,
  },
  {
    path: 'tracking',
    component: MissionTrackingComponent,
  },
];

@NgModule({
  declarations: [
    MissionComponent,
    MissionListComponent,
    MissionFormComponent,
    MissionHistoryComponent,
    MissionTrackingComponent,
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    EffectsModule.forFeature([MissionsEffects]),
    StoreModule.forFeature(MISSION_STATE_NAME, MissionReducer),
    PathModule,
    NgbModule,
    NgSelectModule,
    FormsModule,
    FeahterIconModule,
  ],
})
export class MissionModule {}
