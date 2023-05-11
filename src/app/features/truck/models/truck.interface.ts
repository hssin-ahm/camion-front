import { TruckModel } from './truck_model.interface';

export interface Truck {
  count: number;
  pagination?: {
    next?: {
      page?: number;
      limit?: number;
    };
    prev?: {
      page?: number;
      limit?: number;
    };
  };
  data: {
    _id: string;
    registration_number: string;
    model: TruckModel;
    photo: string;
    statut: string;
    transmission: string;
    fuel_type: string;
    co2_emission: number;
    number_of_horses: number;
    puissance: number;
    labels: string[];
    date_of_registration: string;
  };
}
