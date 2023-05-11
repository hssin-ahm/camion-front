import { createAction, props } from '@ngrx/store';

import { Fuel } from 'src/app/features/truck/models/fuel.interface';

export const ADD_FUEL = '[Add truck page] add fuel';
export const ADD_FUEL_SUCCESS = '[add truck page] add fuel success';
export const UPDATE_FUEL = '[Add truck page] update fuel';
export const UPDATE_FUEL_SUCCESS = '[Add truck page] update fuel success';
export const UPDATE_FUEL_FAIL = '[Add truck page] update fuel fail';

export const GET_TRUCK_FUELS = '[add truck page] get truck fuels';
export const GET_TRUCK_FUELS_SUCCESS =
  '[add truck page] get truck fuels success';
export const GET_TRUCK_FUELS_FAIL = '[add truck page] get truck fuels fail';

export const GET_SINGLE_FUELS = '[add truck page] get single fuels';
export const GET_SINGLE_FUEL_SUCCESS =
  '[add truck page] get single fuel success';
export const GET_SINGLE_FUEL_FAIL = '[add truck page] get single fuel fail';

export const DELETE_FUEL_ACTION = '[add truck page] delete fuel';
export const DELETE_FUEL_SUCCESS = '[add truck page] delete fuel success';

export const TOGGLE_FUEL_PAGE =
  '[add truck fuel page] toggle between the list page and form page';

export const CHECK_Fuel_DATA = '[fuel page] check fuel if have data or not';
export const CHECK_Fuel_DATA_SUCCESS = '[Add truck page] check fuel success';

export const addFuel = createAction(ADD_FUEL, props<{ fuel }>());
export const addFuelSuccess = createAction(ADD_FUEL_SUCCESS);
export const updateFuel = createAction(UPDATE_FUEL, props<{ fuel }>());
export const updateFuelFail = createAction(UPDATE_FUEL_FAIL);
export const updateFuelSuccess = createAction(UPDATE_FUEL_SUCCESS);

export const getSinleFuel = createAction(
  GET_SINGLE_FUELS,
  props<{ fuel_id }>()
);
export const getSinleFuelSuccess = createAction(
  GET_SINGLE_FUEL_SUCCESS,
  props<{ fuel: Fuel }>()
);
export const getSinleFuelFail = createAction(GET_SINGLE_FUEL_FAIL);

export const getTruckFuels = createAction(
  GET_TRUCK_FUELS,
  props<{ truck_id; page: number; limit: number; searchField?; value? }>()
);
export const getTruckFuelsSuccess = createAction(
  GET_TRUCK_FUELS_SUCCESS,
  props<{ fuels: Fuel[] }>()
);
export const getTruckFuelsFail = createAction(GET_TRUCK_FUELS_FAIL);
export const deleteFuel = createAction(
  DELETE_FUEL_ACTION,
  props<{ id; page; limit; truck_id }>()
);
export const deleteFuelSuccess = createAction(DELETE_FUEL_SUCCESS);

export const toggleFuelPage = createAction(
  TOGGLE_FUEL_PAGE,
  props<{ toggle: boolean; fuel_id? }>()
);

export const checkFuelData = createAction(
  CHECK_Fuel_DATA,
  props<{ truck_id }>()
);
export const checkFuelDataSuccess = createAction(
  CHECK_Fuel_DATA_SUCCESS,
  props<{ result }>()
);
