import { Action, createReducer, on } from '@ngrx/store';
import { loadTruckInformationWithoutPaginationSuccess, loadTrucksSuccess, searchTrucksSuccess } from './truck.actions';
import { initialState, TruckState } from './truck.state';

const _truckReducer = createReducer(
  initialState,
  on(loadTrucksSuccess, (state, action): TruckState => {
    return {
      ...state,
      Trucks: action.trucks,
    };
  }),
  on(searchTrucksSuccess, (state, action): TruckState => {
    return {
      ...state,
      Trucks: action.trucks,
    };
  }),
  on(loadTruckInformationWithoutPaginationSuccess, (state, action): TruckState => {
    return {
      ...state,
      truckInformations: action.truckInformations,
    };
  })
);

export function TruckReducer(state: TruckState, action: Action) {
  return _truckReducer(state, action);
}
