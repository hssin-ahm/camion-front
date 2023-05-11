import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { InterventionComponent } from './intervention.component';
import { InterventionListComponent } from './intervention-list/intervention-list.component';
import { InterventionFormComponent } from './intervention-form/intervention-form.component';
import { EffectsModule } from '@ngrx/effects';
import { InterventionEffects } from './state/intervention.effects';
import { NgxMaskModule } from 'ngx-mask';
import { FormsModule } from '@angular/forms';
import { NgSelectModule } from '@ng-select/ng-select';
import { DropzoneModule } from 'ngx-dropzone-wrapper';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { StoreModule } from '@ngrx/store';
import { INTERVENTION_STATE_NAME } from './state/intervention.selector';
import { InterventionReducer } from './state/intervention.reducer';
import { FeahterIconModule } from 'src/app/core/feather-icon/feather-icon.module';

@NgModule({
  declarations: [
    InterventionComponent,
    InterventionListComponent,
    InterventionFormComponent,
  ],
  imports: [
    CommonModule,
    EffectsModule.forFeature([InterventionEffects]),
    StoreModule.forFeature(INTERVENTION_STATE_NAME, InterventionReducer),
    NgxMaskModule.forRoot({ validation: true }), // Ngx-mask
    NgbModule,
    NgSelectModule,
    DropzoneModule,
    FormsModule,
    FeahterIconModule,
  ],

  exports: [InterventionComponent],
})
export class InterventionModule {}
