import { Store } from '@ngrx/store';
import { map, mergeMap, catchError } from 'rxjs/operators';
import {
  deleteDriver,
  deleteDriverSuccess,
  loadDrivers,
  loadDriversSuccess,
} from './driver.actions';

import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Injectable } from '@angular/core';
import { DriverService } from '../services/driver.service';
import { AppState } from 'src/app/store/app.state';
import { SweetAlertService } from 'src/app/shared/modules/sweet-alert/sweet-alert.service';

@Injectable()
export class DriversEffects {
  constructor(
    private actions$: Actions,
    private driversService: DriverService,
    private store: Store<AppState>,
    private alert: SweetAlertService
  ) {}

  loadDrivers$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(loadDrivers),
      mergeMap((action) => {
        return this.driversService
          .getDrivers(
            action.page,
            action.limit,
            action.searchField,
            action.value
          )
          .pipe(
            map((drivers) => {
              return loadDriversSuccess({ drivers });
            })
          );
      })
    );
  });

  deleteDrivers$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(deleteDriver),
      mergeMap((action) => {
        const page = action.page;
        const limit = action.limit;
        return this.driversService.deleteDriver(action.id).pipe(
          map(() => {
            this.store.dispatch(loadDrivers({ page, limit }));
            this.alert.openAlertMixin(
              'successfully deleted',
              'top-end',
              'success'
            );
            return deleteDriverSuccess();
          })
        );
      })
    );
  });
}
