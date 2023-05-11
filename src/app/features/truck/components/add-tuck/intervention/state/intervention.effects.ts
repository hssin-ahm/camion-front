import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { catchError, map, mergeMap, of, tap } from 'rxjs';
import { InterventionService } from 'src/app/features/truck/services/intervention.service';
import { SweetAlertService } from 'src/app/shared/modules/sweet-alert/sweet-alert.service';
import { AppState } from 'src/app/store/app.state';
import { setLoadingSpinner } from 'src/app/store/shared/shared.action';
import {
  addIntervention,
  addInterventionSuccess,
  getSinleIntervention,
  getSinleInterventioFail,
  getSinleInterventionSuccess,
  updateIntervention,
  updateInterventionFail,
  updateInterventionSuccess,
  getTruckInterventions,
  getTruckInterventionsSuccess,
  deleteIntervention,
  deleteInterventionSuccess,
  getTruckInterventionsFail,
  checkInterventionData,
  checkInterventionDataSuccess,
} from './intervention.action';
@Injectable()
export class InterventionEffects {
  constructor(
    private actions$: Actions,
    private alert: SweetAlertService,
    private interventionService: InterventionService,
    private router: Router,
    private store: Store<AppState>
  ) {}

  addIntervention$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(addIntervention),
      mergeMap((action) => {
        return this.interventionService
          .addIntervention(action.intervention)
          .pipe(
            map(() => {
              this.alert.openAlertMixin(
                'successfully added',
                'top-end',
                'success'
              );
              this.store.dispatch(setLoadingSpinner({ status: false }));

              return addInterventionSuccess();
            }),
            catchError((error: HttpErrorResponse) => {
              this.alert.openAlertMixin(`${error}`, 'top-end', 'error');
              return of();
            })
          );
      })
    );
  });

  getTruckIntervention$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(getSinleIntervention),
      mergeMap((action) => {
        return this.interventionService
          .getSingleIntervention(action.intervention_id)
          .pipe(
            map((intervention: any) => {
              console.log(action.intervention_id);

              if (intervention.data == null) {
                return getSinleInterventioFail();
              }
              return getSinleInterventionSuccess({ intervention });
            }),
            catchError((error: HttpErrorResponse) => {
              this.alert.openAlertMixin(`${error}`, 'top-end', 'error');
              return of(getSinleInterventioFail());
            })
          );
      })
    );
  });

  updateIntervention$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(updateIntervention),
      mergeMap((action) => {
        return this.interventionService
          .updateIntervention(action.intervention)
          .pipe(
            map(() => {
              this.alert.openAlertMixin(
                'successfully updated',
                'top-end',
                'success'
              );
              this.store.dispatch(setLoadingSpinner({ status: false }));

              return updateInterventionSuccess();
            }),
            catchError((error: HttpErrorResponse) => {
              this.alert.openAlertMixin(`${error}`, 'top-end', 'error');
              return of(updateInterventionFail());
            })
          );
      })
    );
  });

  loadInterventions$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(getTruckInterventions),
      mergeMap((action) => {
        return this.interventionService
          .getInterventions(
            action.truck_id,
            action.page,
            action.limit,
            action.searchField,
            action.value
          )
          .pipe(
            map((interventions: any) => {
              return getTruckInterventionsSuccess({ interventions });
            })
          );
      })
    );
  });

  deleteInterventions$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(deleteIntervention),
      mergeMap((action) => {
        const page = action.page;
        const limit = action.limit;
        return this.interventionService.deleteIntervention(action.id).pipe(
          map(() => {
            this.store.dispatch(
              getTruckInterventions({ page, limit, truck_id: action.truck_id })
            );
            this.alert.openAlertMixin(
              'successfully deleted',
              'top-end',
              'success'
            );
            return deleteInterventionSuccess();
          })
        );
      })
    );
  });

  checkInterventionsData$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(checkInterventionData),
      mergeMap((action) => {
        return this.interventionService.checkIntervention(action.truck_id).pipe(
          map((result) => {
            return checkInterventionDataSuccess(result);
          })
        );
      })
    );
  });
}
