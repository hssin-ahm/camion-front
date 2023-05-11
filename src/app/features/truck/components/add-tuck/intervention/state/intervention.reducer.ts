import { Action, createReducer, on } from '@ngrx/store';
import {
  checkInterventionDataSuccess,
  getSinleInterventionSuccess,
  getTruckInterventions,
  getTruckInterventionsFail,
  getTruckInterventionsSuccess,
} from './intervention.action';

import { initialState, InterventionState } from './intervention.state';

const _addInterventionReducer = createReducer(
  initialState,
  on(getSinleInterventionSuccess, (state, action): InterventionState => {
    return {
      ...state,
      intervention: action.intervention,
    };
  }),
  on(getTruckInterventionsSuccess, (state, action): InterventionState => {
    return {
      ...state,
      interventions: action.interventions,
    };
  }),
  on(getTruckInterventionsFail, (state, action): InterventionState => {
    return {
      ...state,
      interventions: null,
    };
  }),
  on(checkInterventionDataSuccess, (state, action): InterventionState => {
    return {
      ...state,
      checkIntervention: action.result,
    };
  })
);

export function InterventionReducer(state: InterventionState, action: Action) {
  return _addInterventionReducer(state, action);
}
