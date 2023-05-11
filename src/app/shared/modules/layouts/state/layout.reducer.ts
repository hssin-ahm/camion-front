import { Action, createReducer, on } from '@ngrx/store';
import { getMe } from './layout.actions';
import { LayoutState, initialState } from './layout.state';

const _layoutReducer = createReducer(
  initialState,
  on(getMe, (state, action): LayoutState => {
    return {
      ...state,
      currentUser: action.currentUser,
    };
  })
);

export function LayoutReducer(state: LayoutState, action: Action) {
  return _layoutReducer(state, action);
}
