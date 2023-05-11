import { Fuel } from '../../truck/models/fuel.interface';
import { Intervention } from '../../truck/models/intervention.interface';
import { TruckStatusData } from '../models/truckStatusData.interface';

export interface DashboardState {
  truckStatusService: TruckStatusData | null;
  missionStatusService: TruckStatusData | null;
  fuels: Fuel[];
  interventions: Intervention[];
  totalCost: any;
}
export const initialState: DashboardState = {
  truckStatusService: null,
  missionStatusService: null,
  fuels: [],
  interventions: [],
  totalCost: undefined,
};
