import { createFeatureSelector, createSelector } from '@ngrx/store';
import { DashboardState } from './dashboard.state';

export const DASHBOARD_STATE_NAME = 'dashboard';

export const dashboardFeatureSelector =
  createFeatureSelector<DashboardState>(DASHBOARD_STATE_NAME);
export const getTruckStatusServiceSelector = createSelector(
  dashboardFeatureSelector,
  (dashboardState: DashboardState) => dashboardState.truckStatusService
);
export const getMissionStatusServiceSelector = createSelector(
  dashboardFeatureSelector,
  (dashboardState: DashboardState) => dashboardState.missionStatusService
);
export const getFuelCostSelector = createSelector(
  dashboardFeatureSelector,
  (dashboardState: DashboardState) => dashboardState.fuels
);
export const getInterventionCostSelector = createSelector(
  dashboardFeatureSelector,
  (dashboardState: DashboardState) => dashboardState.interventions
);

export const getTotalCostSelector = createSelector(
  dashboardFeatureSelector,
  (dashboardState: DashboardState) => dashboardState.totalCost
);
