import { createAction, props } from '@ngrx/store';
import { Driver } from '../models/driver.interface';

export const UPDATE_DRIVER_ACTION = '[add driver page] update driver';
export const UPDATE_DRIVER_SUCCESS = '[add driver page] update driver success';
export const DELETE_DRIVER_ACTION = '[drivers page] delete driver';
export const DELETE_DRIVER_SUCCESS = '[drivers page] delete driver success';
export const LOAD_DRIVERS = '[drivers page] load drivers';
export const LOAD_DRIVERS_SUCCESS = '[drivers page] load drivers success';
export const SEARCH_DRIVERS = '[drivers page] search drivers';
export const SEARCH_DRIVERS_SUCCESS = '[drivers page] Search drivers success';
export const LOAD_DRIVERS_MODEL = '[Add driver page] load model drivers';
export const LOAD_DRIVERS_MODEL_SUCCESS =
  '[Add driver page] load drivers model success';

export const updateDriver = createAction(
  UPDATE_DRIVER_ACTION,
  props<{ driver: Driver }>()
);

export const deleteDriver = createAction(
  DELETE_DRIVER_ACTION,
  props<{ id; page; limit }>()
);
export const deleteDriverSuccess = createAction(DELETE_DRIVER_SUCCESS);

export const loadDrivers = createAction(
  LOAD_DRIVERS,
  props<{
    page: number;
    limit: number;
    searchField?;
    value?;
  }>()
);
export const loadDriversSuccess = createAction(
  LOAD_DRIVERS_SUCCESS,
  props<{ drivers: Driver[] }>()
);
export const searchDrivers = createAction(
  SEARCH_DRIVERS,
  props<{ value: string }>()
);
export const searchDriversSuccess = createAction(
  SEARCH_DRIVERS_SUCCESS,
  props<{ drivers: Driver[] }>()
);
