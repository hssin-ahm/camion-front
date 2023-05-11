import { Fuel } from 'src/app/features/truck/models/fuel.interface';

export interface FuelState {
  fuel: Fuel | null;
  fuels: Fuel[] | null;
  toggle: boolean;
  fuel_id: string;
  checkIntervention: boolean;
}
export const initialState: FuelState = {
  fuel: null,
  fuels: [],
  toggle: false,
  fuel_id: '',
  checkIntervention: false,
};
