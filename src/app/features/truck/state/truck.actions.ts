import { createAction, props } from '@ngrx/store';
import { Truck } from '../models/truck.interface';
import { TruckModel } from '../models/truck_model.interface';

export const UPDATE_TRUCK_ACTION = '[add truck page] update truck';
export const UPDATE_TRUCK_SUCCESS = '[add truck page] update truck success';
export const DELETE_TRUCK_ACTION = '[trucks page] delete truck';
export const DELETE_TRUCK_SUCCESS = '[trucks page] delete truck success';
export const LOAD_TRUCKS = '[trucks page] load trucks';
export const LOAD_TRUCKS_SUCCESS = '[trucks page] load trucks success';
export const SEARCH_TRUCKS = '[trucks page] search trucks';
export const SEARCH_TRUCKS_SUCCESS = '[trucks page] Search trucks success';
export const LOAD_TRUCKS_MODEL = '[Add truck page] load model trucks';
export const LOAD_TRUCKS_MODEL_SUCCESS =
  '[Add truck page] load trucks model success';

// Truck tracking page
export const LOAD_ALL_TRUCKINFORMATIONS =
  '[truck tracking page] load truckInfo without pagination';
export const LOAD_ALL_TRUCKINFORMATIONS_SUCCESS =
  '[truck tracking page] load truckInfo without pagination success';
export const LOAD_ALL_TRUCKINFORMATIONS_FAIL =
  '[truck tracking page] load truckInfo without pagination fail';
export const updateTruck = createAction(
  UPDATE_TRUCK_ACTION,
  props<{ Truck: Truck }>()
);

// export const updateTruckSuccess = createAction(
//   UPDATE_TRUCK_SUCCESS,
//   props<{ Truck: Update<Truck> }>()
// );

export const deleteTruck = createAction(
  DELETE_TRUCK_ACTION,
  props<{ id; page; limit }>()
);
export const deleteTruckSuccess = createAction(DELETE_TRUCK_SUCCESS);

export const loadTrucks = createAction(
  LOAD_TRUCKS,
  props<{
    page: number;
    limit: number;
    searchField?;
    value?;
  }>()
);
export const loadTrucksSuccess = createAction(
  LOAD_TRUCKS_SUCCESS,
  props<{ trucks: Truck[] }>()
);
export const searchTrucks = createAction(
  SEARCH_TRUCKS,
  props<{ value: string }>()
);
export const searchTrucksSuccess = createAction(
  SEARCH_TRUCKS_SUCCESS,
  props<{ trucks: Truck[] }>()
);

//truck tracking
export const loadTruckInformationWithoutPagination = createAction(
  LOAD_ALL_TRUCKINFORMATIONS
);
export const loadTruckInformationWithoutPaginationSuccess = createAction(
  LOAD_ALL_TRUCKINFORMATIONS_SUCCESS,
  props<{ truckInformations }>()
);
export const loadTruckInformationWithoutPaginationFail = createAction(
  LOAD_ALL_TRUCKINFORMATIONS_FAIL
);
