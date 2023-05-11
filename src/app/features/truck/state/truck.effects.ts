import { Store } from '@ngrx/store';
import { map, mergeMap, catchError } from 'rxjs/operators';
import {
  deleteTruck,
  deleteTruckSuccess,
  loadTruckInformationWithoutPagination,
  loadTruckInformationWithoutPaginationSuccess,
  loadTrucks,
  loadTrucksSuccess,
  searchTrucks,
  searchTrucksSuccess,
} from './truck.actions';

import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Injectable } from '@angular/core';
import { TruckService } from '../services/truck.service';
import { AppState } from 'src/app/store/app.state';
import { SweetAlertService } from 'src/app/shared/modules/sweet-alert/sweet-alert.service';

@Injectable()
export class TrucksEffects {
  constructor(
    private actions$: Actions,
    private TrucksService: TruckService,
    private store: Store<AppState>,
    private alert: SweetAlertService
  ) {}

  loadTrucks$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(loadTrucks),
      mergeMap((action) => {
        return this.TrucksService.getTrucks(
          action.page,
          action.limit,
          action.searchField,
          action.value
        ).pipe(
          map((trucks) => {
            return loadTrucksSuccess({ trucks });
          })
        );
      })
    );
  });

  searchTrucks$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(searchTrucks),
      mergeMap((action) => {
        return this.TrucksService.searchTrucks(action.value).pipe(
          map((trucks) => {
            return searchTrucksSuccess({ trucks });
          })
        );
      })
    );
  });
  deleteTrucks$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(deleteTruck),
      mergeMap((action) => {
        const page = action.page;
        const limit = action.limit;
        return this.TrucksService.deleteTruck(action.id).pipe(
          map(() => {
            this.store.dispatch(loadTrucks({ page, limit }));
            this.alert.openAlertMixin(
              'successfully deleted',
              'top-end',
              'success'
            );
            return deleteTruckSuccess();
          })
        );
      })
    );
  });

  loadTrucksInformations$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(loadTruckInformationWithoutPagination),
      mergeMap((action) => {
        return this.TrucksService.getAllTrucksInformations().pipe(
          map((truckInformations) => {
            return loadTruckInformationWithoutPaginationSuccess({
              truckInformations,
            });
          })
        );
      })
    );
  });
}
