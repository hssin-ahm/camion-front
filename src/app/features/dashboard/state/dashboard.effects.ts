import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { mergeMap, map, of, tap } from 'rxjs';
import { switchMap, catchError } from 'rxjs/operators';
import { HttpErrorResponse } from '@angular/common/http';
import {
  getFuelCostFail,
  getFuelCostStart,
  getFuelCostSuccess,
  getInterventionCostFail,
  getInterventionCostStart,
  getInterventionCostSuccess,
  getTotalCostFail,
  getTotalCostStart,
  getTotalCostSuccess,
  missionStatusFail,
  missionStatusStart,
  missionStatusSuccess,
  truckStatusFail,
  truckStatusStart,
  truckStatusSuccess,
} from './dashboard.actions';
import { TruckStatusData } from '../models/truckStatusData.interface';
import { DashboardService } from '../services/dashboard.service';
import { SweetAlertService } from 'src/app/shared/modules/sweet-alert/sweet-alert.service';

@Injectable()
export class DashboardEffects {
  constructor(
    private action$: Actions,
    private dashboardServices: DashboardService,
    private alert: SweetAlertService
  ) {}

  getTruckStatus$ = createEffect(() => {
    return this.action$.pipe(
      ofType(truckStatusStart),
      mergeMap((action) => {
        return this.dashboardServices.getTruckStatus().pipe(
          map((response: TruckStatusData) => {
            return truckStatusSuccess({ response });
          }),
          catchError((error: HttpErrorResponse) => {
            return of(truckStatusFail());
          })
        );
      })
    );
  });

  getMissionStatus$ = createEffect(() => {
    return this.action$.pipe(
      ofType(missionStatusStart),
      mergeMap((action) => {
        return this.dashboardServices.getMissionStatus().pipe(
          map((response) => {
            return missionStatusSuccess({ response });
          }),
          catchError((error: HttpErrorResponse) => {
            return of(missionStatusFail());
          })
        );
      })
    );
  });

  getFuelCost$ = createEffect(() => {
    return this.action$.pipe(
      ofType(getFuelCostStart),
      mergeMap((action) => {
        return this.dashboardServices.getFuelCost().pipe(
          map((response) => {
            return getFuelCostSuccess({ response });
          }),
          catchError((error: HttpErrorResponse) => {
            return of(getFuelCostFail());
          })
        );
      })
    );
  });

  getInterventionCost$ = createEffect(() => {
    return this.action$.pipe(
      ofType(getInterventionCostStart),
      mergeMap((action) => {
        return this.dashboardServices.getInterventionCost().pipe(
          map((response) => {
            return getInterventionCostSuccess({ response });
          }),
          catchError((error: HttpErrorResponse) => {
            return of(getInterventionCostFail());
          })
        );
      })
    );
  });

  getTotalCost$ = createEffect(() => {
    return this.action$.pipe(
      ofType(getTotalCostStart),
      mergeMap((action) => {
        return this.dashboardServices.getTotalCost(action.option).pipe(
          map((response) => {
            if (response.data.length == 0) {
              this.alert.openAlertMixin(
                `No data for this ${action.option}`,
                'top-end',
                'info'
              );
              return getTotalCostFail();
            }
            return getTotalCostSuccess({ response });
          }),
          catchError((error: HttpErrorResponse) => {
            return of(getTotalCostFail());
          })
        );
      })
    );
  });
}
