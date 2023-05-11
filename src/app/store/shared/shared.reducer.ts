import { Action, createReducer, on } from '@ngrx/store';
import { changeaAtuelBreadcrumb, setLoadingSpinner } from './shared.action';
import { initialState, SharedState } from './shared.state';

const _sharedReducer = createReducer(
  initialState,
  on(setLoadingSpinner, (state, action): SharedState => {
    return {
      ...state,
      showLoading: action.status,
    };
  }),
  on(changeaAtuelBreadcrumb, (state, action): SharedState => {
    return {
      ...state,
      actuelItem: action.item,
      actuelItemActive: action.itemActive,
    };
  })
);

export function SharedReducer(state: SharedState, action: Action) {
  return _sharedReducer(state, action);
}
