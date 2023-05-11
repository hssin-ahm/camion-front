import { createFeatureSelector, createSelector } from '@ngrx/store';
import { LayoutState } from './layout.state';

export const LAYOUT_STATE_NAME = 'layout';
export const layoutSelector =
  createFeatureSelector<LayoutState>(LAYOUT_STATE_NAME);
export const curentUserSelector = createSelector(
  layoutSelector,
  (authState: LayoutState) => authState.currentUser
);
