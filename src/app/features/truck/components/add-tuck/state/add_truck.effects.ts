import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { catchError, map, mergeMap, of, tap } from 'rxjs';
import { SweetAlertService } from 'src/app/shared/modules/sweet-alert/sweet-alert.service';
import { AppState } from 'src/app/store/app.state';
import { setLoadingSpinner } from 'src/app/store/shared/shared.action';
import { Contract } from '../../../models/contract.interface';
import { ContractService } from '../../../services/contract.service';
import { CostService } from '../../../services/cost.service';
import { TruckService } from '../../../services/truck.service';
import {
  addContract,
  addContractSuccess,
  AddFounisseur,
  AddFounisseurSuccess,
  addTruck,
  AddTruckModel,
  AddTruckModelSuccess,
  addTruckSuccess,
  getCosts,
  getCostsSuccess,
  getSingleTruck,
  getSingleTruckFail,
  getSingleTruckSuccess,
  getTotalPrice,
  getTotalPriceSuccess,
  getTruckContract,
  getTruckContractFail,
  getTruckContractSuccess,
  loadFounisseurs,
  loadFounisseursSuccess,
  loadTruckModel,
  loadTruckModelSuccess,
  updateContract,
  updateContractFail,
  updateContractSuccess,
  updateTruck,
  updateTruckSuccess,
} from './add_truck.action';
@Injectable()
export class AddTrucksEffects {
  constructor(
    private actions$: Actions,
    private TrucksService: TruckService,
    private alert: SweetAlertService,
    private router: Router,
    private contractService: ContractService,
    private costService: CostService,
    private store: Store<AppState>
  ) {}

  loadTruckModel$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(loadTruckModel),
      mergeMap((action) => {
        return this.TrucksService.getTruckModels().pipe(
          map((truck_models) => {
            return loadTruckModelSuccess({ truck_models });
          })
        );
      })
    );
  });

  addTruck$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(addTruck),
      mergeMap((action) => {
        return this.TrucksService.addTruck(action.truck).pipe(
          map((truck: any) => {
            this.alert.openAlertMixin(
              'successfully added',
              'top-end',
              'success'
            );
            const truck_id: number = truck.data._id;
            console.log(truck.data);
            return addTruckSuccess({ truck_id });
          }),
          catchError((error: HttpErrorResponse) => {
            this.alert.openAlertMixin(`this truck exists`, 'top-end', 'error');
            return of();
          })
        );
      })
    );
  });

  addTruckModel$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(AddTruckModel),
      mergeMap((action) => {
        return this.TrucksService.addTruckModel(action.model).pipe(
          map(() => {
            this.alert.openAlertMixin(
              'successfully added',
              'top-end',
              'success'
            );
            return AddTruckModelSuccess();
          })
        );
      })
    );
  });

  loadFounisseur$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(loadFounisseurs),
      mergeMap((action) => {
        return this.TrucksService.getFournisseurs().pipe(
          map((fournisseurs) => {
            return loadFounisseursSuccess({ fournisseurs });
          })
        );
      })
    );
  });

  loadCosts$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(getCosts),
      mergeMap((action) => {
        return this.costService
          .getCosts(action.truck_id, action.page, action.limit)
          .pipe(
            map((costs) => {
              return getCostsSuccess({ costs });
            })
          );
      })
    );
  });

  getTotalPrice$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(getTotalPrice),
      mergeMap((action) => {
        return this.costService.getTotalPrice(action.truck_id).pipe(
          map((total) => {
            return getTotalPriceSuccess({ total });
          })
        );
      })
    );
  });

  addContract$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(addContract),
      mergeMap((action) => {
        return this.contractService.addContract(action.contract).pipe(
          map(() => {
            this.alert.openAlertMixin(
              'successfully added',
              'top-end',
              'success'
            );

            this.router.navigate([`/trucks`]);
            return addContractSuccess();
          }),
          catchError((error: HttpErrorResponse) => {
            this.alert.openAlertMixin(`${error}`, 'top-end', 'error');
            return of();
          })
        );
      })
    );
  });

  getTruckContract$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(getTruckContract),
      mergeMap((action) => {
        return this.contractService.getTruckContract(action.truck_id).pipe(
          map((contract: any) => {
            if (contract.data == null) {
              return getTruckContractFail();
            }

            return getTruckContractSuccess({ contract });
          }),
          catchError((error: HttpErrorResponse) => {
            this.alert.openAlertMixin(`${error}`, 'top-end', 'error');
            return of();
          })
        );
      })
    );
  });

  updateContract$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(updateContract),
      mergeMap((action) => {
        return this.contractService.updateContract(action.contract).pipe(
          map(() => {
            this.alert.openAlertMixin(
              'successfully updated',
              'top-end',
              'success'
            );
            this.store.dispatch(setLoadingSpinner({ status: false }));
            return updateContractSuccess();
          }),
          catchError((error: HttpErrorResponse) => {
            this.alert.openAlertMixin(`${error}`, 'top-end', 'error');
            return of(updateContractFail());
          })
        );
      })
    );
  });

  addFournisseur$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(AddFounisseur),
      mergeMap((action) => {
        return this.TrucksService.addFounisseur(action.fournisseur).pipe(
          map(() => {
            this.alert.openAlertMixin(
              'successfully added',
              'top-end',
              'success'
            );
            return AddFounisseurSuccess();
          })
        );
      })
    );
  });

  getSingleTruck$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(getSingleTruck),
      mergeMap((action) => {
        return this.TrucksService.getTruck(action.id).pipe(
          map((truck) => {
            return getSingleTruckSuccess({ truck });
          }),
          catchError((error: HttpErrorResponse) => {
            return of(getSingleTruckFail());
          })
        );
      })
    );
  });

  updateTruck$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(updateTruck),
      mergeMap((action) => {
        return this.TrucksService.updateTruck(
          action.truck,
          action.truck._id
        ).pipe(
          map((truck) => {
            this.alert.openAlertMixin(
              'successfully updated',
              'top-end',
              'success'
            );
            this.store.dispatch(setLoadingSpinner({ status: false }));
            return updateTruckSuccess();
          })
        );
      })
    );
  });

  addTruckRedirect$ = createEffect(
    () => {
      return this.actions$.pipe(
        ofType(addTruckSuccess),
        tap((action) => {
          this.router.navigate([`/trucks/add/${action.truck_id}`]);
        })
      );
    },
    { dispatch: false } //to not return an Observable or an action
  );
}
