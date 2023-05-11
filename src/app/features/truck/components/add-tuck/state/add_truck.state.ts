import { Contract } from '../../../models/contract.interface';
import { Cost } from '../../../models/cost.interface';
import { Fournisseur } from '../../../models/founisseur.interface';
import { Truck } from '../../../models/truck.interface';
import { TruckModel } from '../../../models/truck_model.interface';

export interface AddTruckState {
  truck_models: TruckModel[] | null;
  founisseurs: Fournisseur[] | null;
  truck_id: number | null;
  tab_selected: number | null;
  truck: Truck | null;
  errorMessage: string | null;
  contract: Contract | null;
  costs: Cost[] | null;
  total_price: number;
}
export const initialState: AddTruckState = {
  truck_models: [],
  founisseurs: [],
  truck_id: null,
  tab_selected: 0,
  truck: null,
  errorMessage: null,
  contract: null,
  costs: null,
  total_price: 0,
};
