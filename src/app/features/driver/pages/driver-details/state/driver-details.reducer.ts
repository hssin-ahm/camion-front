import { Action, createReducer, on } from '@ngrx/store';
import {
  selectedTabDriver,
  getSingleDriverSuccess,
  getSingleDriverFail,
  updateDriverSuccess,
  getDriverMissionHistorySuccess,
} from './driver-details.actions';

import { DriverDetailsState, initialState } from './driver-details.state';

const _driverDetailsReducer = createReducer(
  initialState,
  on(selectedTabDriver, (state, action): DriverDetailsState => {
    return {
      ...state,
      tab_selected: action.tab_number,
    };
  }),
  on(getSingleDriverSuccess, (state, action): DriverDetailsState => {
    return {
      ...state,
      driver: action.driver,
    };
  }),
  on(getSingleDriverFail, (state, action): DriverDetailsState => {
    return {
      ...state,
      driver: null,
    };
  }),
  on(getDriverMissionHistorySuccess, (state, action): DriverDetailsState => {
    return {
      ...state,
      missions: action.missions,
    };
  })
);

export function DriverDetailsReducer(
  state: DriverDetailsState,
  action: Action
) {
  return _driverDetailsReducer(state, action);
}
