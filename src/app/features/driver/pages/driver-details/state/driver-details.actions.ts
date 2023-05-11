import { createAction, props } from '@ngrx/store';
import { Mission } from 'src/app/features/mission/models/mission.interface';
import { Driver } from '../../../models/driver.interface';

export const SELECTED_TAB = '[Add driver page] number tab selected';

export const ADD_DRIVER_ACTION = '[add driver page] add driver';
export const ADD_DRIVER_SUCCESS = '[add driver page] add driver success';
export const GET_SINGLE_DRIVER = '[Add driver page] get single driver';
export const GET_SINGLE_DRIVER_SUCCESS =
  '[Add driver page] get single driver success';
export const GET_SINGLE_DRIVER_FAIL =
  '[Add driver page] get single driver fail';
export const UPDATE_DRIVER = '[Add driver page] update driver';
export const UPDATE_DRIVER_SUCCESS = '[Add driver page] update driver success';

export const GET_DRIVER_MISSION_HISTORY =
  '[mission history page] get mission driver history';
export const GET_MISSIONS_DRIVER_HISTORY_SUCCESS =
  '[mission history page] get mission driver history success';

export const selectedTabDriver = createAction(
  SELECTED_TAB,
  props<{ tab_number: number }>()
);

export const addDriver = createAction(ADD_DRIVER_ACTION, props<{ driver }>());

export const addDriverSuccess = createAction(
  ADD_DRIVER_SUCCESS,
  props<{ driver_id: number }>()
);

export const getSingleDriver = createAction(GET_SINGLE_DRIVER, props<{ id }>());
export const getSingleDriverSuccess = createAction(
  GET_SINGLE_DRIVER_SUCCESS,
  props<{ driver }>()
);
export const getSingleDriverFail = createAction(GET_SINGLE_DRIVER_FAIL);
export const updateDriver = createAction(UPDATE_DRIVER, props<{ driver }>());
export const updateDriverSuccess = createAction(UPDATE_DRIVER_SUCCESS);

export const getDriverMissionHistory = createAction(
  GET_DRIVER_MISSION_HISTORY,
  props<{ driver_id; page: number; limit: number; searchField?; value?}>()
);
export const getDriverMissionHistorySuccess = createAction(
  GET_MISSIONS_DRIVER_HISTORY_SUCCESS,
  props<{ missions: Mission[] }>()
);
