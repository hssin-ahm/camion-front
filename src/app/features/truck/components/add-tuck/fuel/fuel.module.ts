import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EffectsModule } from '@ngrx/effects';
import { FuelEffects } from './state/fuel.effects';
import { Fuel_STATE_NAME } from './state/fuel.selector';
import { FuelReducer } from './state/fuel.reducer';
import { StoreModule } from '@ngrx/store';
import { NgxMaskModule } from 'ngx-mask';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgSelectModule } from '@ng-select/ng-select';
import { DropzoneModule } from 'ngx-dropzone-wrapper';
import { FormsModule } from '@angular/forms';
import { FeahterIconModule } from 'src/app/core/feather-icon/feather-icon.module';
import { FuelComponent } from './fuel.component';
import { FuelFormComponent } from './fuel-form/fuel-form.component';
import { FuelListComponent } from './fuel-list/fuel-list.component';

@NgModule({
  declarations: [FuelComponent, FuelFormComponent, FuelListComponent],
  imports: [
    CommonModule,
    EffectsModule.forFeature([FuelEffects]),
    StoreModule.forFeature(Fuel_STATE_NAME, FuelReducer),
    NgxMaskModule.forRoot({ validation: true }), // Ngx-mask
    NgbModule,
    NgSelectModule,
    DropzoneModule,
    FormsModule,
    FeahterIconModule,
  ],

  exports: [FuelComponent],
})
export class FuelModule {}
