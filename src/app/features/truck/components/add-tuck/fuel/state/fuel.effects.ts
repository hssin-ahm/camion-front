import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { catchError, map, mergeMap, of, tap } from 'rxjs';
import { FuelService } from 'src/app/features/truck/services/fuel.service';
import { InterventionService } from 'src/app/features/truck/services/intervention.service';
import { SweetAlertService } from 'src/app/shared/modules/sweet-alert/sweet-alert.service';
import { AppState } from 'src/app/store/app.state';
import { setLoadingSpinner } from 'src/app/store/shared/shared.action';
import {
  addFuel,
  addFuelSuccess,
  getSinleFuel,
  getSinleFuelSuccess,
  updateFuel,
  updateFuelFail,
  updateFuelSuccess,
  getTruckFuels,
  getTruckFuelsSuccess,
  deleteFuel,
  deleteFuelSuccess,
  getSinleFuelFail,
  checkFuelData,
  checkFuelDataSuccess,
} from './fuel.action';
@Injectable()
export class FuelEffects {
  constructor(
    private actions$: Actions,
    private alert: SweetAlertService,
    private fuelService: FuelService,
    private router: Router,
    private store: Store<AppState>
  ) {}

  addFuel$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(addFuel),
      mergeMap((action) => {
        return this.fuelService.addFuel(action.fuel).pipe(
          map(() => {
            this.alert.openAlertMixin(
              'successfully added',
              'top-end',
              'success'
            );
            this.store.dispatch(setLoadingSpinner({ status: false }));

            return addFuelSuccess();
          }),
          catchError((error: HttpErrorResponse) => {
            this.alert.openAlertMixin(`${error}`, 'top-end', 'error');
            return of();
          })
        );
      })
    );
  });

  getTruckFuel$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(getSinleFuel),
      mergeMap((action) => {
        return this.fuelService.getSingleFuel(action.fuel_id).pipe(
          map((fuel: any) => {
            console.log(action.fuel_id);

            if (fuel.data == null) {
              return getSinleFuelFail();
            }
            return getSinleFuelSuccess({ fuel });
          }),
          catchError((error: HttpErrorResponse) => {
            this.alert.openAlertMixin(`${error}`, 'top-end', 'error');
            return of(getSinleFuelFail());
          })
        );
      })
    );
  });

  updateFuel$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(updateFuel),
      mergeMap((action) => {
        return this.fuelService.updateFuel(action.fuel).pipe(
          map(() => {
            this.alert.openAlertMixin(
              'successfully updated',
              'top-end',
              'success'
            );
            this.store.dispatch(setLoadingSpinner({ status: false }));

            return updateFuelSuccess();
          }),
          catchError((error: HttpErrorResponse) => {
            this.alert.openAlertMixin(`${error}`, 'top-end', 'error');
            return of(updateFuelFail());
          })
        );
      })
    );
  });

  loadFuels$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(getTruckFuels),
      mergeMap((action) => {
        return this.fuelService
          .getFuels(
            action.truck_id,
            action.page,
            action.limit,
            action.searchField,
            action.value
          )
          .pipe(
            map((fuels: any) => {
              return getTruckFuelsSuccess({ fuels });
            })
          );
      })
    );
  });

  deleteFuels$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(deleteFuel),
      mergeMap((action) => {
        const page = action.page;
        const limit = action.limit;
        return this.fuelService.deleteFuel(action.id).pipe(
          map(() => {
            this.store.dispatch(
              getTruckFuels({ page, limit, truck_id: action.truck_id })
            );
            this.alert.openAlertMixin(
              'successfully deleted',
              'top-end',
              'success'
            );
            return deleteFuelSuccess();
          })
        );
      })
    );
  });

  checkFuelsData$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(checkFuelData),
      mergeMap((action) => {
        return this.fuelService.checkFuel(action.truck_id).pipe(
          map((result) => {
            return checkFuelDataSuccess(result);
          })
        );
      })
    );
  });
}
