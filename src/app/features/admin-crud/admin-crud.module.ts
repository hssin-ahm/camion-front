import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { AdminCrudComponent } from './admin-crud.component';
import { PathModule } from 'src/app/shared/modules/path/path.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgSelectModule } from '@ng-select/ng-select';
import { FormsModule } from '@angular/forms';
import { FeahterIconModule } from 'src/app/core/feather-icon/feather-icon.module';
import { AdminListComponent } from './components/admin-list/admin-list.component';
import { AdminFormComponent } from './components/admin-form/admin-form.component';
import { AdminsEffects } from './state/admin.effects';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { ADMIN_STATE_NAME } from './state/admin.selector';
import { AdminReducer } from './state/admin.reducer';
import { NgxMaskModule } from 'ngx-mask';

const routes: Routes = [
  {
    path: '',
    component: AdminCrudComponent,
    children: [
      {
        path: '',
        component: AdminListComponent,
      },
      {
        path: 'add',
        component: AdminFormComponent,
      },
      {
        path: 'update/:id',
        component: AdminFormComponent,
      },
    ],
  },
];

@NgModule({
  declarations: [AdminCrudComponent, AdminListComponent, AdminFormComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    EffectsModule.forFeature([AdminsEffects]),
    StoreModule.forFeature(ADMIN_STATE_NAME, AdminReducer),
    NgxMaskModule.forRoot({ validation: true }),
    PathModule,
    NgbModule,
    NgSelectModule,
    FormsModule,
    FeahterIconModule,
  ],
})
export class AdminCrudModule {}
