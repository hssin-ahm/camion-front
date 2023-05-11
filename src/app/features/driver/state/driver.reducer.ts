import { Action, createReducer, on } from '@ngrx/store';
import { loadDriversSuccess } from './driver.actions';
import { initialState, DriverState } from './driver.state';

const _driverReducer = createReducer(
  initialState,
  on(loadDriversSuccess, (state, action): DriverState => {
    return {
      ...state,
      drivers: action.drivers,
    };
  })
);

export function DriverReducer(state: DriverState, action: Action) {
  return _driverReducer(state, action);
}
