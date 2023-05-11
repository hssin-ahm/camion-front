import { Store } from '@ngrx/store';
import { map, mergeMap, catchError, tap } from 'rxjs/operators';
import {
  addMission,
  addMissionSuccess,
  deleteMission,
  deleteMissionSuccess,
  filterMissionBetweenTwoDate,
  filterMissionBetweenTwoDateFail,
  filterMissionBetweenTwoDateSuccess,
  getSingleMission,
  getSingleMissionFail,
  getSingleMissionSuccess,
  loadClientsWithoutPagination,
  loadClientsWithoutPaginationSuccess,
  loadDriversWithoutPagination,
  loadDriversWithoutPaginationSuccess,
  loadMissions,
  loadMissionsSuccess,
  loadMissionsWithoutPagination,
  loadMissionsWithoutPaginationFail,
  loadMissionsWithoutPaginationSuccess,
  loadTrucksWithoutPagination,
  loadTrucksWithoutPaginationSuccess,
  updateMission,
  updateMissionSuccess,
} from './mission.actions';

import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Injectable } from '@angular/core';
import { MissionService } from '../services/mission.service';
import { AppState } from 'src/app/store/app.state';
import { SweetAlertService } from 'src/app/shared/modules/sweet-alert/sweet-alert.service';
import { setLoadingSpinner } from 'src/app/store/shared/shared.action';
import { HttpErrorResponse } from '@angular/common/http';
import { of } from 'rxjs';
import { Router } from '@angular/router';
import { TruckService } from '../../truck/services/truck.service';
import { DriverService } from '../../driver/services/driver.service';
import { ClientService } from '../../clients/services/client.service';

@Injectable()
export class MissionsEffects {
  constructor(
    private actions$: Actions,
    private missionsService: MissionService,
    private trucksService: TruckService,
    private driversService: DriverService,
    private clientService: ClientService,
    private store: Store<AppState>,
    private alert: SweetAlertService,
    private router: Router
  ) {}

  loadMissions$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(loadMissions),
      mergeMap((action) => {
        return this.missionsService
          .getMissions(
            action.page,
            action.limit,
            action.searchField,
            action.value
          )
          .pipe(
            map((missions) => {
              return loadMissionsSuccess({ missions });
            })
          );
      })
    );
  });

  loadMissionsHistory$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(filterMissionBetweenTwoDate),
      mergeMap((action) => {
        return this.missionsService
          .getMissionHistory(action.missionHistoryReq)
          .pipe(
            map((missions: any) => {
              if (missions.missions.length == 0) {
                this.alert.openAlertMixin(
                  'No data With these dates',
                  'top-end',
                  'info'
                );
                return filterMissionBetweenTwoDateFail();
              }
              return filterMissionBetweenTwoDateSuccess({ missions });
            }),
            catchError((error: HttpErrorResponse) => {
              this.alert.openAlertMixin(`${error}`, 'top-end', 'error');
              return of(filterMissionBetweenTwoDateFail());
            })
          );
      })
    );
  });

  deleteMissions$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(deleteMission),
      mergeMap((action) => {
        const page = action.page;
        const limit = action.limit;
        return this.missionsService.deleteMission(action.id).pipe(
          map(() => {
            this.store.dispatch(loadMissions({ page, limit }));
            this.alert.openAlertMixin(
              'successfully deleted',
              'top-end',
              'success'
            );
            return deleteMissionSuccess();
          })
        );
      })
    );
  });

  addMission$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(addMission),
      mergeMap((action) => {
        return this.missionsService.addMission(action.mission).pipe(
          map((Mission: any) => {
            this.alert.openAlertMixin(
              'successfully added',
              'top-end',
              'success'
            );
            const Mission_id: number = Mission.data._id;

            this.store.dispatch(setLoadingSpinner({ status: false }));
            return addMissionSuccess();
          }),
          catchError((error: HttpErrorResponse) => {
            this.alert.openAlertMixin(`${error}`, 'top-end', 'error');
            return of();
          })
        );
      })
    );
  });

  getSingleMission$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(getSingleMission),
      mergeMap((action) => {
        return this.missionsService.getMission(action.id).pipe(
          map((mission) => {
            return getSingleMissionSuccess({ mission });
          }),
          catchError((error: HttpErrorResponse) => {
            return of(getSingleMissionFail());
          })
        );
      })
    );
  });

  updateMission$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(updateMission),
      mergeMap((action) => {
        return this.missionsService
          .updateMission(action.mission, action.mission._id)
          .pipe(
            map((Mission) => {
              this.alert.openAlertMixin(
                'successfully updated',
                'top-end',
                'success'
              );
              this.router.navigate([`/missions`]);
              this.store.dispatch(setLoadingSpinner({ status: false }));

              return updateMissionSuccess();
            })
          );
      })
    );
  });
  loadTruckWithoutPaginations$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(loadTrucksWithoutPagination),
      mergeMap((action) => {
        return this.trucksService.getAllTrucksWithoutPagination().pipe(
          map((trucks) => {
            return loadTrucksWithoutPaginationSuccess({ trucks });
          })
        );
      })
    );
  });

  loadDriverWithoutPaginations$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(loadDriversWithoutPagination),
      mergeMap((action) => {
        return this.driversService.getDriversWithoutPagination().pipe(
          map((drivers) => {
            return loadDriversWithoutPaginationSuccess({ drivers });
          })
        );
      })
    );
  });
  loadClientWithoutPaginations$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(loadClientsWithoutPagination),
      mergeMap((action) => {
        return this.clientService.getAllClient().pipe(
          map((clients) => {
            return loadClientsWithoutPaginationSuccess({ clients });
          })
        );
      })
    );
  });

  addMissionRedirect$ = createEffect(
    () => {
      return this.actions$.pipe(
        ofType(addMissionSuccess),
        tap((action) => {
          this.router.navigate([`/missions`]);
        })
      );
    },
    { dispatch: false } //to not return an Observable or an action
  );
  loadAllMissions$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(loadMissionsWithoutPagination),
      mergeMap((action) => {
        return this.missionsService.getAllMissions().pipe(
          map((missions: any) => {
            if (missions.missions.length == 0) {
              return loadMissionsWithoutPaginationFail();
            }
            return loadMissionsWithoutPaginationSuccess({ missions });
          }),
          catchError((error: HttpErrorResponse) => {
            this.alert.openAlertMixin(`${error}`, 'top-end', 'error');
            return of(loadMissionsWithoutPaginationFail());
          })
        );
      })
    );
  });
}
