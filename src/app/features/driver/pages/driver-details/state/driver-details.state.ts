import { Mission } from 'src/app/features/mission/models/mission.interface';
import { Driver } from '../../../models/driver.interface';

export interface DriverDetailsState {
  driver_id: number | null;
  tab_selected: number | null;
  driver: Driver | null;
  missions: Mission[] | null;
}
export const initialState: DriverDetailsState = {
  driver_id: null,
  tab_selected: 0,
  driver: null,
  missions: [],
};
