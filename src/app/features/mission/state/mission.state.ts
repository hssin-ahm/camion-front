import { Driver } from '../../driver/models/driver.interface';
import { Truck } from '../../truck/models/truck.interface';
import { Mission } from '../models/mission.interface';

export interface MissionState {
  missions: Mission[] | null;
  missionsHistory: Mission[] | null;
  mission: Mission | null;
  trucks: Truck[] | null;
  drivers: Driver[] | null;
  clients: Driver[] | null;
  missionsWP: Mission[] | null;
}
export const initialState: MissionState = {
  missions: [],
  mission: null,
  trucks: [],
  drivers: [],
  clients: [],
  missionsHistory: [],
  missionsWP: [],
};
