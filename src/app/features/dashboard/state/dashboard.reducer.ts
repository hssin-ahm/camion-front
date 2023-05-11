import { Action, createReducer, on } from '@ngrx/store';
import {
  getFuelCostSuccess,
  getInterventionCostSuccess,
  getTotalCostFail,
  getTotalCostSuccess,
  missionStatusSuccess,
  truckStatusSuccess,
} from './dashboard.actions';
import { DashboardState, initialState } from './dashboard.state';

const _dashboardReducer = createReducer(
  initialState,
  on(truckStatusSuccess, (state, action): DashboardState => {
    return {
      ...state,
      truckStatusService: action.response,
    };
  }),
  on(missionStatusSuccess, (state, action): DashboardState => {
    return {
      ...state,
      missionStatusService: action.response,
    };
  }),
  on(getFuelCostSuccess, (state, action): DashboardState => {
    return {
      ...state,
      fuels: action.response,
    };
  }),
  on(getInterventionCostSuccess, (state, action): DashboardState => {
    return {
      ...state,
      interventions: action.response,
    };
  }),
  on(getTotalCostSuccess, (state, action): DashboardState => {
    return {
      ...state,
      totalCost: action.response,
    };
  }),
  on(getTotalCostFail, (state, action): DashboardState => {
    return {
      ...state,
      totalCost: null,
    };
  })
);

export function DashboardReducer(state: DashboardState, action: Action) {
  return _dashboardReducer(state, action);
}
