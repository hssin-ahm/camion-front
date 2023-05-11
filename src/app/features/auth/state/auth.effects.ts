import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { exhaustMap, map, of, tap } from 'rxjs';
import { switchMap, catchError } from 'rxjs/operators';
import {
  forgotPasswordStart,
  loginFail,
  loginStart,
  loginSuccess,
  logout,
  resetPasswordFail,
  resetPasswordStart,
  resetPasswordtokenverifFail,
  resetPasswordtokenverifStart,
  sendEmailFail,
  sendEmailSuccess,
} from './auth.actions';
import { AuthService } from '../services/auth.service';
import { LoginResponceInterface } from '../models/loginResponse.interface';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { UserAuthService } from '../services/user-auth.service';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/store/app.state';
import { setLoadingSpinner } from 'src/app/store/shared/shared.action';
import { SweetAlertService } from 'src/app/shared/modules/sweet-alert/sweet-alert.service';

@Injectable()
export class AuthEffects {
  constructor(
    private action$: Actions,
    private authService: AuthService,
    private router: Router,
    private userauthservice: UserAuthService,
    private store: Store<AppState>,
    private alert: SweetAlertService
  ) {}

  login$ = createEffect(() => {
    //filter the action
    return this.action$.pipe(
      ofType(loginStart),
      switchMap(({ request }) => {
        return this.authService.login(request).pipe(
          map((response) => {
            return loginSuccess({ response });
          }),
          catchError((error: HttpErrorResponse) => {
            this.store.dispatch(setLoadingSpinner({ status: false }));
            return of(loginFail({ error: error.error }));
          })
        );
      })
    );
  });

  loginRedirect$ = createEffect(
    () => {
      return this.action$.pipe(
        ofType(loginSuccess),
        tap((action) => {
          this.userauthservice.setRoles(action.response.role);
          this.userauthservice.setToken(action.response.token);
          const userRole = this.userauthservice.getRole();

          if (userRole == 'admin') {
            this.router.navigate(['/dashboard']);
          } else {
            this.router.navigate(['/admins']);
          }
          new Promise(() => {
            setTimeout(() => {
              this.store.dispatch(setLoadingSpinner({ status: false }));
              this.alert.openAlertMixin(
                'Signed in successfully',
                'top-end',
                'success'
              );
            }, 200);
          });
        })
      );
    },
    { dispatch: false } //to not return an Observable or an action
  );

  logout$ = createEffect(
    () => {
      return this.action$.pipe(
        ofType(logout),
        map((action) => {
          this.userauthservice.clear();
          this.store.dispatch(setLoadingSpinner({ status: true }));
          this.router.navigate(['/auth/login']);
        })
      );
    },
    { dispatch: false }
  );
  forgotPassword$ = createEffect(() => {
    return this.action$.pipe(
      ofType(forgotPasswordStart),
      switchMap(({ forgotPasswordRequest }) => {
        return this.authService.forgotPassword(forgotPasswordRequest).pipe(
          map((response) => {
            this.store.dispatch(setLoadingSpinner({ status: false }));
            return sendEmailSuccess({ response });
          }),
          catchError((error: HttpErrorResponse) => {
            this.store.dispatch(setLoadingSpinner({ status: false }));
            return of(sendEmailFail({ error: error.error }));
          })
        );
      })
    );
  });

  openAlert$ = createEffect(
    () => {
      return this.action$.pipe(
        ofType(sendEmailSuccess),
        switchMap(({ response }) => {
          this.store.dispatch(sendEmailFail({ error: null }));
          return this.alert.openAlert(
            'Sended',
            'An email has been sent. please check your inbox',
            'success'
          );
        })
      );
    },
    { dispatch: false }
  );

  resetPassword$ = createEffect(() => {
    return this.action$.pipe(
      ofType(resetPasswordStart),
      switchMap(({ resetPasswordRequest }) => {
        return this.authService.resetPassword(resetPasswordRequest).pipe(
          map((response) => {
            this.store.dispatch(setLoadingSpinner({ status: true }));
            return loginSuccess({ response });
          }),
          catchError((error: HttpErrorResponse) => {
            this.store.dispatch(setLoadingSpinner({ status: false }));
            return of(resetPasswordFail({ error: error.error }));
          })
        );
      })
    );
  });

  resetPasswordTokenVerif$ = createEffect(() => {
    return this.action$.pipe(
      ofType(resetPasswordtokenverifStart),
      switchMap(({ token }) => {
        return this.authService.resetPasswordtokenverif(token).pipe(
          map((response) => {
            return response;
          }),
          catchError((error: HttpErrorResponse) => {
            this.store.dispatch(setLoadingSpinner({ status: false }));
            return of(resetPasswordtokenverifFail({ error: error.error }));
          })
        );
      })
    );
  });
}
