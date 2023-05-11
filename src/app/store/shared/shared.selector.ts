import { createFeatureSelector, createSelector } from '@ngrx/store';
import { SharedState } from './shared.state';

export const SHARED_STATE_NAME = 'shared';

export const getSharedState =
  createFeatureSelector<SharedState>(SHARED_STATE_NAME);
export const getLoading = createSelector(
  getSharedState,
  (SharedState: SharedState) => SharedState.showLoading
);

export const getActuelBreadcrumbItem = createSelector(
  getSharedState,
  (SharedState: SharedState) => SharedState.actuelItem
);
export const getActuelBreadcrumbItemActive = createSelector(
  getSharedState,
  (SharedState: SharedState) => SharedState.actuelItemActive
);
