import { Action, createReducer, on } from '@ngrx/store';
import {
  checkFuelDataSuccess,
  getSinleFuelSuccess,
  getTruckFuels,
  getTruckFuelsFail,
  getTruckFuelsSuccess,
} from './fuel.action';

import { initialState, FuelState } from './fuel.state';

const _addFuelReducer = createReducer(
  initialState,
  on(getSinleFuelSuccess, (state, action): FuelState => {
    return {
      ...state,
      fuel: action.fuel,
    };
  }),
  on(getTruckFuelsSuccess, (state, action): FuelState => {
    return {
      ...state,
      fuels: action.fuels,
    };
  }),
  on(getTruckFuelsFail, (state, action): FuelState => {
    return {
      ...state,
      fuels: null,
    };
  }),
  on(getTruckFuelsFail, (state, action): FuelState => {
    return {
      ...state,
      fuels: null,
    };
  }),
  on(checkFuelDataSuccess, (state, action): FuelState => {
    return {
      ...state,
      checkIntervention: action.result,
    };
  })
);

export function FuelReducer(state: FuelState, action: Action) {
  return _addFuelReducer(state, action);
}
