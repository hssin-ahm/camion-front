import { Driver } from '../models/driver.interface';

export interface DriverState {
  drivers: Driver[] | null;
}
export const initialState: DriverState = {
  drivers: [],
};
