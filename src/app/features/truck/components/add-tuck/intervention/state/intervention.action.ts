import { createAction, props } from '@ngrx/store';
import { Intervention } from 'src/app/features/truck/models/intervention.interface';

export const ADD_INTERVENTION = '[Add truck page] add intervention';
export const ADD_INTERVENTION_SUCCESS =
  '[add truck page] add intervention success';
export const UPDATE_INTERVENTION = '[Add truck page] update intervention';
export const UPDATE_INTERVENTION_SUCCESS =
  '[Add truck page] update intervention success';
export const UPDATE_INTERVENTION_FAIL =
  '[Add truck page] update intervention fail';

export const GET_TRUCK_INTERVENTIONS =
  '[add truck page] get truck interventions';
export const GET_TRUCK_INTERVENTIONS_SUCCESS =
  '[add truck page] get truck interventions success';
export const GET_TRUCK_INTERVENTIONS_FAIL =
  '[add truck page] get truck interventions fail';

export const GET_SINGLE_INTERVENTIONS =
  '[add truck page] get single interventions';
export const GET_SINGLE_INTERVENTION_SUCCESS =
  '[add truck page] get single intervention success';
export const GET_SINGLE_INTERVENTION_FAIL =
  '[add truck page] get single intervention fail';

export const DELETE_INTERVENTION_ACTION =
  '[add truck page] delete Intervention';
export const DELETE_INTERVENTION_SUCCESS =
  '[add truck page] delete Intervention success';

export const TOGGLE_INTERVENTION_PAGE =
  '[add truck intervention page] toggle between the list page and form page';
export const CHECK_INTERVENTION_DATA =
  '[intervention page] check intervention if have data or not';
export const CHECK_INTERVENTION_DATA_SUCCESS =
  '[Add truck page] check intervention success';

export const addIntervention = createAction(
  ADD_INTERVENTION,
  props<{ intervention }>()
);
export const addInterventionSuccess = createAction(ADD_INTERVENTION_SUCCESS);
export const updateIntervention = createAction(
  UPDATE_INTERVENTION,
  props<{ intervention }>()
);
export const updateInterventionFail = createAction(UPDATE_INTERVENTION_FAIL);
export const updateInterventionSuccess = createAction(
  UPDATE_INTERVENTION_SUCCESS
);

export const getSinleIntervention = createAction(
  GET_SINGLE_INTERVENTIONS,
  props<{ intervention_id }>()
);
export const getSinleInterventionSuccess = createAction(
  GET_SINGLE_INTERVENTION_SUCCESS,
  props<{ intervention: Intervention }>()
);
export const getSinleInterventioFail = createAction(
  GET_SINGLE_INTERVENTION_FAIL
);

export const getTruckInterventions = createAction(
  GET_TRUCK_INTERVENTIONS,
  props<{ truck_id; page: number; limit: number; searchField?; value? }>()
);
export const getTruckInterventionsSuccess = createAction(
  GET_TRUCK_INTERVENTIONS_SUCCESS,
  props<{ interventions: Intervention[] }>()
);
export const getTruckInterventionsFail = createAction(
  GET_TRUCK_INTERVENTIONS_FAIL
);
export const deleteIntervention = createAction(
  DELETE_INTERVENTION_ACTION,
  props<{ id; page; limit; truck_id }>()
);
export const deleteInterventionSuccess = createAction(
  DELETE_INTERVENTION_SUCCESS
);

export const toggleInterventionPage = createAction(
  TOGGLE_INTERVENTION_PAGE,
  props<{ toggle: boolean; intervention_id? }>()
);
export const checkInterventionData = createAction(
  CHECK_INTERVENTION_DATA,
  props<{ truck_id }>()
);
export const checkInterventionDataSuccess = createAction(
  CHECK_INTERVENTION_DATA_SUCCESS,
  props<{ result }>()
);
