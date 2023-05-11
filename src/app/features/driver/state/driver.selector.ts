import { createFeatureSelector, createSelector } from '@ngrx/store';
import { DriverState } from './driver.state';
export const DRIVER_STATE_NAME = 'driver';

export const authFeatureSelector =
  createFeatureSelector<DriverState>(DRIVER_STATE_NAME);
export const getDrivers = createSelector(
  authFeatureSelector,
  (driverState: DriverState) => driverState.drivers
);
