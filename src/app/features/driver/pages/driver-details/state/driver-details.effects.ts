import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { catchError, map, mergeMap, of, tap } from 'rxjs';
import { MissionService } from 'src/app/features/mission/services/mission.service';
import { SweetAlertService } from 'src/app/shared/modules/sweet-alert/sweet-alert.service';
import { AppState } from 'src/app/store/app.state';
import { setLoadingSpinner } from 'src/app/store/shared/shared.action';
import { DriverService } from '../../../services/driver.service';
import {
  addDriver,
  addDriverSuccess,
  getDriverMissionHistory,
  getDriverMissionHistorySuccess,
  getSingleDriver,
  getSingleDriverFail,
  getSingleDriverSuccess,
  updateDriver,
  updateDriverSuccess,
} from './driver-details.actions';
@Injectable()
export class DriversDetailsEffects {
  constructor(
    private actions$: Actions,
    private driversService: DriverService,
    private missionsService: MissionService,
    private alert: SweetAlertService,
    private router: Router,
    private store: Store<AppState>
  ) {}

  addDriver$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(addDriver),
      mergeMap((action) => {
        return this.driversService.addDriver(action.driver).pipe(
          map((driver: any) => {
            this.alert.openAlertMixin(
              'successfully added',
              'top-end',
              'success'
            );
            const driver_id: number = driver.data._id;

            this.store.dispatch(setLoadingSpinner({ status: false }));
            return addDriverSuccess({ driver_id });
          }),
          catchError((error: HttpErrorResponse) => {
            this.store.dispatch(setLoadingSpinner({ status: false }));

            this.alert.openAlertMixin(`${error}`, 'top-end', 'error');
            return of();
          })
        );
      })
    );
  });

  getSingleDriver$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(getSingleDriver),
      mergeMap((action) => {
        return this.driversService.getDriver(action.id).pipe(
          map((driver) => {
            return getSingleDriverSuccess({ driver });
          }),
          catchError((error: HttpErrorResponse) => {
            return of(getSingleDriverFail());
          })
        );
      })
    );
  });
  getDriverMissionHistory$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(getDriverMissionHistory),
      mergeMap((action) => {
        return this.missionsService.getDriverMission(action.driver_id).pipe(
          map((missions: any) => {
            return getDriverMissionHistorySuccess({ missions });
          })
        );
      })
    );
  });
  updateDriver$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(updateDriver),
      mergeMap((action) => {
        return this.driversService
          .updateDriver(action.driver, action.driver._id)
          .pipe(
            map((driver) => {
              this.alert.openAlertMixin(
                'successfully updated',
                'top-end',
                'success'
              );
              this.router.navigate([`/drivers`]);
              this.store.dispatch(setLoadingSpinner({ status: false }));

              return updateDriverSuccess();
            })
          );
      })
    );
  });

  addDriverRedirect$ = createEffect(
    () => {
      return this.actions$.pipe(
        ofType(addDriverSuccess),
        tap((action) => {
          this.router.navigate([`/drivers`]);
        })
      );
    },
    { dispatch: false } //to not return an Observable or an action
  );
}
