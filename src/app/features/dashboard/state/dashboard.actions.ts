import { createAction, props } from '@ngrx/store';
import { TruckStatusData } from '../models/truckStatusData.interface';

// staus truck data action
export const GET_TRUCK_STATUS_DATA_START =
  '[Dashboard page] get Truck Status Data start';
export const GET_TRUCK_STATUS_DATA_SUCCESS =
  '[Dashboard page] get Truck Status Data success';
export const GET_TRUCK_STATUS_DATA__FAIL =
  '[Dashboard page] get Truck Status Data fail';

// staus mission data action
export const GET_MISSION_STATUS_DATA_START =
  '[Dashboard page] get mission Status Data start';
export const GET_MISSION_STATUS_DATA_SUCCESS =
  '[Dashboard page] get mission Status Data success';
export const GET_MISSION_STATUS_DATA__FAIL =
  '[Dashboard page] get mission Status Data fail';

// fuel cost chart action
export const GET_FUEL_COST_START = '[Dashboard page] get fuel cost Data start';
export const GET_FUEL_COST_SUCCESS =
  '[Dashboard page] get fuel cost Data success';
export const GET_FUEL_COST_FAIL = '[Dashboard page] get fuel cost Data fail';

// intervention cost chart action
export const GET_INTERVENTION_COST_START =
  '[Dashboard page] get intervention cost Data start';
export const GET_INTERVENTION_COST_SUCCESS =
  '[Dashboard page] get intervention cost Data success';
export const GET_INTERVENTION_COST_FAIL =
  '[Dashboard page] get intervention cost Data fail';

// total cost fuel action
export const GET_TOTAL_COST_START =
  '[Dashboard page] get total cost Data start';
export const GET_TOTAL_COST_SUCCESS =
  '[Dashboard page] get total cost Data success';
export const GET_TOTAL_COST_FAIL = '[Dashboard page] get total cost Data fail';

// staus truck data action
export const truckStatusStart = createAction(GET_TRUCK_STATUS_DATA_START);
export const truckStatusSuccess = createAction(
  GET_TRUCK_STATUS_DATA_SUCCESS,
  props<{ response: TruckStatusData }>()
);
export const truckStatusFail = createAction(GET_TRUCK_STATUS_DATA__FAIL);

// staus mission data action
export const missionStatusStart = createAction(GET_MISSION_STATUS_DATA_START);
export const missionStatusSuccess = createAction(
  GET_MISSION_STATUS_DATA_SUCCESS,
  props<{ response }>()
);
export const missionStatusFail = createAction(GET_MISSION_STATUS_DATA__FAIL);

// fuel cost chart action
export const getFuelCostStart = createAction(GET_FUEL_COST_START);
export const getFuelCostSuccess = createAction(
  GET_FUEL_COST_SUCCESS,
  props<{ response }>()
);
export const getFuelCostFail = createAction(GET_FUEL_COST_FAIL);

// Intervention cost chart action
export const getInterventionCostStart = createAction(
  GET_INTERVENTION_COST_START
);
export const getInterventionCostSuccess = createAction(
  GET_INTERVENTION_COST_SUCCESS,
  props<{ response }>()
);
export const getInterventionCostFail = createAction(GET_INTERVENTION_COST_FAIL);

// total cost fuel action

export const getTotalCostStart = createAction(GET_TOTAL_COST_START, props<{ option }>());
export const getTotalCostSuccess = createAction(
  GET_TOTAL_COST_SUCCESS,
  props<{ response }>()
);
export const getTotalCostFail = createAction(GET_TOTAL_COST_FAIL);
