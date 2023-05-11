import { Action, createReducer, on } from '@ngrx/store';
import {
  loadTruckModelSuccess,
  loadFounisseursSuccess,
  addTruckSuccess,
  selectedTab,
  getSingleTruckSuccess,
  getSingleTruckFail,
  getTruckContractSuccess,
  getTruckContractFail,
  addContractSuccess,
  getCostsSuccess,
  getTotalPriceSuccess,
} from './add_truck.action';

import { AddTruckState, initialState } from './add_truck.state';

const _addtruckReducer = createReducer(
  initialState,
  on(loadTruckModelSuccess, (state, action): AddTruckState => {
    return {
      ...state,
      truck_models: action.truck_models,
    };
  }),
  on(loadFounisseursSuccess, (state, action): AddTruckState => {
    return {
      ...state,
      founisseurs: action.fournisseurs,
    };
  }),
  on(addTruckSuccess, (state, action): AddTruckState => {
    return {
      ...state,
      truck_id: action.truck_id,
      tab_selected: 1,
    };
  }),
  // on(addContractSuccess, (state, action): AddTruckState => {
  //   return {
  //     ...state,
  //     tab_selected: 2,
  //   };
  // }),
  on(selectedTab, (state, action): AddTruckState => {
    return {
      ...state,
      tab_selected: action.tab_number,
    };
  }),
  on(getSingleTruckSuccess, (state, action): AddTruckState => {
    return {
      ...state,
      truck: action.truck,
    };
  }),
  on(getSingleTruckFail, (state, action): AddTruckState => {
    return {
      ...state,
      truck: null,
    };
  }),
  on(getTruckContractSuccess, (state, action): AddTruckState => {
    return {
      ...state,
      contract: action.contract,
    };
  }),
  on(getTruckContractFail, (state, action): AddTruckState => {
    return {
      ...state,
      contract: null,
    };
  }),
  on(getCostsSuccess, (state, action): AddTruckState => {
    return {
      ...state,
      costs: action.costs,
    };
  }),
  on(getTotalPriceSuccess, (state, action): AddTruckState => {
    return {
      ...state,
      total_price: action.total,
    };
  })
);

export function AddTruckReducer(state: AddTruckState, action: Action) {
  return _addtruckReducer(state, action);
}
