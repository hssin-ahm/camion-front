import { Store } from '@ngrx/store';
import { map, mergeMap, switchMap, catchError } from 'rxjs/operators';
import {
  addAdmin,
  addAdminFail,
  addAdminSuccess,
  deleteAdmin,
  deleteAdminSuccess,
  getSingleAdmin,
  getSingleAdminFail,
  getSingleAdminSuccess,
  loadAdmins,
  loadAdminsSuccess,
  updateAdmin,
  updateAdminSuccess,
} from './admin.actions';

import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Injectable } from '@angular/core';
import { AdminService } from '../services/admin.service';
import { AppState } from 'src/app/store/app.state';
import { SweetAlertService } from 'src/app/shared/modules/sweet-alert/sweet-alert.service';
import { setLoadingSpinner } from 'src/app/store/shared/shared.action';
import { HttpErrorResponse } from '@angular/common/http';

import { of, tap } from 'rxjs';
import { Router } from '@angular/router';

@Injectable()
export class AdminsEffects {
  constructor(
    private actions$: Actions,
    private adminsService: AdminService,
    private store: Store<AppState>,
    private alert: SweetAlertService,
    private router: Router
  ) {}

  loadadmins$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(loadAdmins),
      mergeMap((action) => {
        return this.adminsService
          .getAdmins(
            action.page,
            action.limit,
            action.searchField,
            action.value
          )
          .pipe(
            map((admins) => {
              return loadAdminsSuccess({ admins });
            })
          );
      })
    );
  });

  deleteadmins$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(deleteAdmin),
      mergeMap((action) => {
        const page = action.page;
        const limit = action.limit;
        return this.adminsService.deleteAdmin(action.id).pipe(
          map(() => {
            this.store.dispatch(loadAdmins({ page, limit }));
            this.alert.openAlertMixin(
              'successfully deleted',
              'top-end',
              'success'
            );
            return deleteAdminSuccess();
          })
        );
      })
    );
  });

  // admin form

  addAdmin$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(addAdmin),
      switchMap((action) => {
        return this.adminsService.addAdmin(action.admin).pipe(
          map((admin: any) => {
            this.alert.openAlertMixin(
              'successfully added',
              'top-end',
              'success'
            );
            const admin_id: number = admin.data._id;

            this.store.dispatch(setLoadingSpinner({ status: false }));
            return addAdminSuccess({ admin_id });
          }),
          catchError((error: HttpErrorResponse) => {
            this.store.dispatch(setLoadingSpinner({ status: false }));

            this.alert.openAlertMixin(`${error}`, 'top-end', 'error');
            return of(addAdminFail());
          })
        );
      })
    );
  });

  getSingleAdmin$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(getSingleAdmin),
      mergeMap((action) => {
        return this.adminsService.getAdmin(action.id).pipe(
          map((admin) => {
            return getSingleAdminSuccess({ admin });
          }),
          catchError((error: HttpErrorResponse) => {
            return of(getSingleAdminFail());
          })
        );
      })
    );
  });
  updateAdmin$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(updateAdmin),
      mergeMap((action) => {
        return this.adminsService
          .updateAdmin(action.admin, action.admin._id)
          .pipe(
            map((Admin) => {
              this.alert.openAlertMixin(
                'successfully updated',
                'top-end',
                'success'
              );
              this.router.navigate([`/admins`]);
              this.store.dispatch(setLoadingSpinner({ status: false }));

              return updateAdminSuccess();
            })
          );
      })
    );
  });

  addAdminRedirect$ = createEffect(
    () => {
      return this.actions$.pipe(
        ofType(addAdminSuccess),
        tap((action) => {
          this.router.navigate([`/admins`]);
        })
      );
    },
    { dispatch: false } //to not return an Observable or an action
  );
}
