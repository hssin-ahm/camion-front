import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { BackendErrorsInterface } from 'src/app/shared/modules/backendErrorMessages/model/backendErrors.interface';
import { loginFail, loginStart } from '../../state/auth.actions';
import { validationsErrorSelector } from '../../state/auth.selector';
import { LoginRequestInterface } from '../../models/loginRequest.interface';
import { setLoadingSpinner } from 'src/app/store/shared/shared.action';
import { UserAuthService } from '../../services/user-auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  backendError: string | undefined;
  backendErrors$: Observable<BackendErrorsInterface | null>;

  constructor(
    private store: Store,
    private router: Router,
    private authService: UserAuthService
  ) {}

  ngOnInit(): void {
    new Promise(() => {
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
  // returnUrl() {
  //   if (this.authService.isLoggedIn()) {
  //     this.router.navigate(['/dashboard']);
  //   }
  // }

  login(form: NgForm) {
    const request: LoginRequestInterface = form.value;
    this.store.dispatch(setLoadingSpinner({ status: true }));
    this.store.dispatch(loginStart({ request }));
  }
  redirect() {
    this.store.dispatch(setLoadingSpinner({ status: true }));
    this.store.dispatch(loginFail({ error: null }));
    this.router.navigate(['/auth/forgot-password']);
  }
}
