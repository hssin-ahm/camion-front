import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { UpdateProfilComponent } from './components/update-profil/update-profil.component';
import { FormsModule } from '@angular/forms';
import { FeahterIconModule } from 'src/app/core/feather-icon/feather-icon.module';
import { AngularCropperjsModule } from 'angular-cropperjs';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { EffectsModule } from '@ngrx/effects';
import { UserEffects } from './state/user.effects';
import { ChangePasswordComponent } from './components/change-password/change-password.component';
import { PathModule } from 'src/app/shared/modules/path/path.module';

const routes: Routes = [
  {
    path: 'update-password',
    component: ChangePasswordComponent,
  },
  {
    path: 'profile',
    component: UpdateProfilComponent,
  },
];

@NgModule({
  declarations: [UpdateProfilComponent, ChangePasswordComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    EffectsModule.forFeature([UserEffects]),
    // StoreModule.forFeature(MISSION_STATE_NAME, MissionReducer),
    // PathModule,
    NgbModule,
    // NgSelectModule,
    AngularCropperjsModule,

    FormsModule,
    FeahterIconModule,
    PathModule,
  ],
})
export class UserModule {}
