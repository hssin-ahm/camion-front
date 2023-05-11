import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { catchError, map, mergeMap, of, switchMap } from 'rxjs';
import { SweetAlertService } from 'src/app/shared/modules/sweet-alert/sweet-alert.service';
import { AppState } from 'src/app/store/app.state';
import { setLoadingSpinner } from 'src/app/store/shared/shared.action';
import { UserService } from '../services/user.service';
import {
  changeUserPassword,
  changeUserPasswordFail,
  updateLoggedUser,
  updateLoggedUserSuccess,
} from './user.actions';

@Injectable()
export class UserEffects {
  constructor(
    private actions$: Actions,
    private alert: SweetAlertService,
    private store: Store<AppState>,
    private userService: UserService
  ) {}

  updateAdmin$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(updateLoggedUser),
      mergeMap((action) => {
        return this.userService.uploadloggedUser(action.user).pipe(
          map((user) => {
            this.alert.openAlertMixin(
              'successfully updated',
              'top-end',
              'success'
            );
            this.store.dispatch(setLoadingSpinner({ status: false }));

            return updateLoggedUserSuccess();
          })
        );
      })
    );
  });

  changePassword$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(changeUserPassword),
      switchMap((action) => {
        return this.userService.changePassword(action.password).pipe(
          map((user) => {
            this.alert.openAlertMixin(
              'successfully updated',
              'top-end',
              'success'
            );
            this.store.dispatch(setLoadingSpinner({ status: false }));

            return updateLoggedUserSuccess();
          }),
          catchError((error: HttpErrorResponse) => {
            this.store.dispatch(setLoadingSpinner({ status: false }));
            this.alert.openAlertMixin(
              `Current password is incorrect`,
              'top-end',
              'error'
            );
            return of(changeUserPasswordFail({ error: error.error }));
          })
        );
      })
    );
  });
}
