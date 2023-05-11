import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { MatTabsModule } from '@angular/material/tabs';

import { DropzoneModule } from 'ngx-dropzone-wrapper';
import { DROPZONE_CONFIG } from 'ngx-dropzone-wrapper';
import { DropzoneConfigInterface } from 'ngx-dropzone-wrapper';
const DEFAULT_DROPZONE_CONFIG: DropzoneConfigInterface = {
  // Change this to your upload POST address:
  url: `${environment.apiBaseUrl}/model/photo`,
  maxFilesize: 50,
  acceptedFiles: 'image/*',
};

// Ngx-chips
import { TagInputForm, TagInputModule } from 'ngx-chips';
import { TruckInformationComponent } from './truck-information/truck-information.component';
import { PathModule } from 'src/app/shared/modules/path/path.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgSelectModule } from '@ng-select/ng-select';
// Ngx-custom-validators
import { CustomFormsModule } from 'ngx-custom-validators';

import { NgxMaskModule, IConfig } from 'ngx-mask';
import { AddTruckComponent } from './add-truck.component';
import { ContractComponent } from './contract/contract.component';
import { environment } from 'src/environments/environment';
import { StoreModule } from '@ngrx/store';
import { ADD_TRUCK_STATE_NAME } from './state/add_truck.selector';
import { AddTruckReducer } from './state/add_truck.reducer';
import { EffectsModule } from '@ngrx/effects';
import { AddTrucksEffects } from './state/add_truck.effects';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { CostComponent } from './cost/cost.component';
import { InterventionModule } from './intervention/intervention.module';
import { FuelModule } from './fuel/fuel.module';

const routes: Routes = [
  {
    path: '',
    component: AddTruckComponent,
  },
  { path: ':id', component: AddTruckComponent },
  { path: ':id/contract', component: AddTruckComponent },
  {
    path: ':id/intervention',
    component: AddTruckComponent,
  },
  { path: ':id/fuel', component: AddTruckComponent },
  { path: ':id/cost', component: AddTruckComponent },
];

@NgModule({
  declarations: [
    AddTruckComponent,
    TruckInformationComponent,
    ContractComponent,
    CostComponent,
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    EffectsModule.forFeature([AddTrucksEffects]),
    StoreModule.forFeature(ADD_TRUCK_STATE_NAME, AddTruckReducer),
    MatTabsModule,
    PathModule,
    FormsModule,
    ReactiveFormsModule,
    NgSelectModule,
    DropzoneModule,
    TagInputModule,
    CustomFormsModule,
    DropzoneModule,
    NgxMaskModule.forRoot({ validation: true }), // Ngx-mask
    NgbModule,
    InterventionModule,
    FuelModule,
  ],
  providers: [
    {
      provide: DROPZONE_CONFIG,
      useValue: DEFAULT_DROPZONE_CONFIG,
    }, // Ngx-dropzone-wrapper
  ],
})
export class AddTruckModule {}
