import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { ClientDetailsComponent } from './client-details.component';
import { ClientFormComponent } from './client-form/client-form.component';
import { NgxMaskModule } from 'ngx-mask';
import { MatTabsModule } from '@angular/material/tabs';
import { FormsModule } from '@angular/forms';
import { NgSelectModule } from '@ng-select/ng-select';
import { PathModule } from 'src/app/shared/modules/path/path.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FeahterIconModule } from 'src/app/core/feather-icon/feather-icon.module';
import { MissionHistoryComponent } from './mission-history/mission-history.component';

const routes: Routes = [
  {
    path: '',
    component: ClientDetailsComponent,
  },
  {
    path: ':id',
    component: ClientDetailsComponent,
  },
];

@NgModule({
  declarations: [ClientDetailsComponent, ClientFormComponent, MissionHistoryComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    NgxMaskModule.forRoot({ validation: true }), // Ngx-mask
    MatTabsModule,
    FormsModule,
    NgSelectModule,
    PathModule,
    NgbModule,
    FeahterIconModule,
  ],
})
export class ClientDetailsModule {}
