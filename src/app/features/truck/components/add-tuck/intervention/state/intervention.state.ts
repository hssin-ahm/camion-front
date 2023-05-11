import { Intervention } from 'src/app/features/truck/models/intervention.interface';

export interface InterventionState {
  intervention: Intervention | null;
  interventions: Intervention[] | null;
  toggle: boolean;
  intervention_id: string;
  checkIntervention: boolean;
}
export const initialState: InterventionState = {
  intervention: null,
  interventions: [],
  toggle: false,
  intervention_id: '',
  checkIntervention: false,
};
