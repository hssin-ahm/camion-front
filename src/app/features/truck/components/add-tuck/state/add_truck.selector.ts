import { createFeatureSelector, createSelector } from '@ngrx/store';
import { AddTruckState } from './add_truck.state';

export const ADD_TRUCK_STATE_NAME = 'add_truck';

export const addTruckFeatureSelector =
  createFeatureSelector<AddTruckState>(ADD_TRUCK_STATE_NAME);

export const getTruckModels = createSelector(
  addTruckFeatureSelector,
  (addTruckState: AddTruckState) => addTruckState.truck_models
);
export const getFournisseurs = createSelector(
  addTruckFeatureSelector,
  (addTruckState: AddTruckState) => addTruckState.founisseurs
);
export const getTruck_id = createSelector(
  addTruckFeatureSelector,
  (addTruckState: AddTruckState) => addTruckState.truck_id
);
export const getTabNumber = createSelector(
  addTruckFeatureSelector,
  (addTruckState: AddTruckState) => addTruckState.tab_selected
);

export const getTruck = createSelector(
  addTruckFeatureSelector,
  (addTruckState: AddTruckState) => addTruckState.truck
);

export const getTruckContractSelector = createSelector(
  addTruckFeatureSelector,
  (addTruckState: AddTruckState) => addTruckState.contract
);
export const getCostsSelector = createSelector(
  addTruckFeatureSelector,
  (addTruckState: AddTruckState) => addTruckState.costs
);
export const getTotalPriceSelector = createSelector(
  addTruckFeatureSelector,
  (addTruckState: AddTruckState) => addTruckState.total_price
);
