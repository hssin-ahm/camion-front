import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { StoreModule } from '@ngrx/store';
import { FormsModule } from '@angular/forms';
import { EffectsModule } from '@ngrx/effects';

import { LoginComponent } from './components/login/login.component';
import { AUTH_STATE_NAME } from './state/auth.selector';
import { AuthReducer } from './state/auth.reducer';
import { AuthEffects } from './state/auth.effects';
import { BackendErrorMessagesModule } from 'src/app/shared/modules/backendErrorMessages/components/backend-error-messages.module';
import { SendEmailComponent } from './components/send-email/send-email.component';
import { ResetPasswordComponent } from './components/reset-password/reset-password.component';

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'login',
        component: LoginComponent,
      },
      {
        path: 'forgot-password',
        component: SendEmailComponent,
      },
      {
        path: 'reset-password/:resetToken',
        component: ResetPasswordComponent,
      },
    ],
  },
];

@NgModule({
  declarations: [LoginComponent, SendEmailComponent, ResetPasswordComponent],
  imports: [
    CommonModule,
    FormsModule,
    RouterModule.forChild(routes),
    EffectsModule.forFeature([AuthEffects]),
    StoreModule.forFeature(AUTH_STATE_NAME, AuthReducer),
    BackendErrorMessagesModule,
  ],
})
export class AuthModule {}
