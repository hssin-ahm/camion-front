import { createFeatureSelector, createSelector } from '@ngrx/store';
import { InterventionState } from './intervention.state';

export const INTERVENTION_STATE_NAME = 'intervention';

export const interventionFeatureSelector =
  createFeatureSelector<InterventionState>(INTERVENTION_STATE_NAME);

export const getTruckInterventionsSelector = createSelector(
  interventionFeatureSelector,
  (interventionState: InterventionState) => interventionState.interventions
);
export const getSigleIntervention = createSelector(
  interventionFeatureSelector,
  (interventionState: InterventionState) => interventionState.intervention
);
export const getToggleInterventionPage = createSelector(
  interventionFeatureSelector,
  (interventionState: InterventionState) => interventionState.toggle
);
export const checkInterventionsData = createSelector(
  interventionFeatureSelector,
  (interventionState: InterventionState) => interventionState.checkIntervention
);
