import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { BackendErrorsInterface } from 'src/app/shared/modules/backendErrorMessages/model/backendErrors.interface';
import { setLoadingSpinner } from 'src/app/store/shared/shared.action';
import { ForgotPasswordRequest } from '../../models/forgotPasswordRequest.interface';
import {
  forgotPasswordStart,
  loginFail,
  sendEmailFail,
} from '../../state/auth.actions';
import { validationsErrorSelector } from '../../state/auth.selector';

@Component({
  selector: 'app-send-email',
  templateUrl: './send-email.component.html',
  styleUrls: ['./send-email.component.scss'],
})
export class SendEmailComponent implements OnInit {
  constructor(private store: Store, private router: Router) {}
  backendError: string | undefined;
  backendErrors$: Observable<BackendErrorsInterface | null>;
  buttonValue: string = 'Send';

  ngOnInit(): void {
    const maPromesse = new Promise(() => {
      setTimeout(() => {
        this.store.dispatch(setLoadingSpinner({ status: false }));
      }, 200);
    });
    this.initializeValues();
  }

  initializeValues(): void {
    this.backendErrors$ = this.store.pipe(select(validationsErrorSelector));
    this.backendErrors$.subscribe((data) => {
      this.backendError = data?.error;
    });
  }
  send(form: NgForm) {
    const email: string = form.value;
    const forgotPasswordRequest = new ForgotPasswordRequest(email);
    this.store.dispatch(setLoadingSpinner({ status: true }));
    this.store.dispatch(forgotPasswordStart({ forgotPasswordRequest }));
    this.buttonValue = 'Send back';
  }
  redirect() {
    this.store.dispatch(setLoadingSpinner({ status: true }));
    this.store.dispatch(sendEmailFail({ error: null }));
    this.router.navigate(['/auth/login']);
  }
}
