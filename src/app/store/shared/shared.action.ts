import { createAction, props } from '@ngrx/store';

export const SET_LOADING_SPINNER = '[shared state] set loading spinner';
export const OPEN_ALERT = '[shared state] open alert';
export const CHANGE_BREADCRUMP = '[shared state] change breadcrump';

export const setLoadingSpinner = createAction(
  SET_LOADING_SPINNER,
  props<{ status: boolean }>()
);
export const changeaAtuelBreadcrumb = createAction(
  CHANGE_BREADCRUMP,
  props<{ item: string; itemActive: string }>()
);

export const openAlert = createAction(OPEN_ALERT, props<{ status: boolean }>());
