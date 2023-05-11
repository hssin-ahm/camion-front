import { Truck } from '../models/truck.interface';
import { TruckModel } from '../models/truck_model.interface';

export interface TruckState {
  Trucks: Truck[] | null;
  truckInformations: any | null
}
export const initialState: TruckState = {
  Trucks: [],
  truckInformations: undefined
};
