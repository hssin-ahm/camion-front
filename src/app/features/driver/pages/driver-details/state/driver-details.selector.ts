import { createFeatureSelector, createSelector } from '@ngrx/store';
import { DriverDetailsState } from './driver-details.state';
export const DRIVER_DETAILs_STATE_NAME = 'driverDetails';

export const authFeatureSelector = createFeatureSelector<DriverDetailsState>(
  DRIVER_DETAILs_STATE_NAME
);
export const getSigleDriverSelector = createSelector(
  authFeatureSelector,
  (driverState: DriverDetailsState) => driverState.driver
);
export const getTabSelectedNumForDriverDetails = createSelector(
  authFeatureSelector,
  (driverState: DriverDetailsState) => driverState.tab_selected
);
export const getDriverId = createSelector(
  authFeatureSelector,
  (driverState: DriverDetailsState) => driverState.driver_id
);

export const getMissionsHistoryForDriver = createSelector(
  authFeatureSelector,
  (driverState: DriverDetailsState) => driverState.missions
);
