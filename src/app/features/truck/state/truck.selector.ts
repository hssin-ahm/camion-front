import { createFeatureSelector, createSelector } from '@ngrx/store';
import { TruckState } from './truck.state';

export const TRUCK_STATE_NAME = 'truck';

export const authFeatureSelector =
  createFeatureSelector<TruckState>(TRUCK_STATE_NAME);
export const getTrucks = createSelector(
  authFeatureSelector,
  (truckState: TruckState) => truckState.Trucks
);

export const getTruckInfos = createSelector(
  authFeatureSelector,
  (truckState: TruckState) => truckState.truckInformations
);
