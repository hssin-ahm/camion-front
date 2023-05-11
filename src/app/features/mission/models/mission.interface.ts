import { Driver } from '../../driver/models/driver.interface';
import { Truck } from '../../truck/models/truck.interface';

export interface Mission {
  _id: string;
  name: string;
  start_location: string;
  end_location: string;
  date: string;
  description: string;
  driver: Driver;
  truck: Truck;
}
