import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { BackendErrorsInterface } from 'src/app/shared/modules/backendErrorMessages/model/backendErrors.interface';
import { AppState } from 'src/app/store/app.state';
import { setLoadingSpinner } from 'src/app/store/shared/shared.action';
import { ResetPasswordRequest } from '../../models/resetPasswordRequest.interface';
import {
  resetPasswordStart,
  resetPasswordtokenverifStart,
  sendEmailFail,
} from '../../state/auth.actions';
import { validationsErrorSelector } from '../../state/auth.selector';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss'],
})
export class ResetPasswordComponent implements OnInit {
  backendError: string | undefined;
  resetToken: string;
  backendErrors$: Observable<BackendErrorsInterface | null>;

  constructor(
    private store: Store<AppState>,
    private router: Router,
    private ar: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.ar.paramMap.subscribe((params: ParamMap) => {
      this.resetToken = params.get('resetToken');

      this.store.dispatch(
        resetPasswordtokenverifStart({ token: this.resetToken })
      );
    });
    this.initializeValues();
  }

  initializeValues(): void {
    this.backendErrors$ = this.store.pipe(select(validationsErrorSelector));
    this.backendErrors$.subscribe((data) => {
      this.backendError = data?.error;
    });
  }

  redirect() {
    this.store.dispatch(setLoadingSpinner({ status: true }));
    this.store.dispatch(sendEmailFail({ error: null }));
    this.router.navigate(['/auth/login']);
  }
  resetPassword(resetPasswordForm: NgForm) {
    const password: string = resetPasswordForm.value.password;
    const resetPasswordRequest = new ResetPasswordRequest(
      password,
      this.resetToken
    );
    this.store.dispatch(resetPasswordStart({ resetPasswordRequest }));
  }
}
