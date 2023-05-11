import { createFeatureSelector, createSelector } from '@ngrx/store';
import { FuelState } from './fuel.state';

export const Fuel_STATE_NAME = 'Fuel';

export const fuelFeatureSelector =
  createFeatureSelector<FuelState>(Fuel_STATE_NAME);

export const getTruckFuelsSelector = createSelector(
  fuelFeatureSelector,
  (FuelState: FuelState) => FuelState.fuels
);
export const getSigleFuel = createSelector(
  fuelFeatureSelector,
  (FuelState: FuelState) => FuelState.fuel
);
export const getToggleFuelPage = createSelector(
  fuelFeatureSelector,
  (fuelState: FuelState) => fuelState.toggle
);
export const checkFuelsData = createSelector(
  fuelFeatureSelector,
  (fuelState: FuelState) => fuelState.checkIntervention
);
