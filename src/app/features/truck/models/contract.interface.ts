import { Fournisseur } from './founisseur.interface';
import { Truck } from './truck.interface';

export interface Contract {
  _id: string;
  contract_reference: string;
  responsable: string;
  type: number;
  statut: string;
  contract_start_date: string;
  contract_expiry_date: string;
  fournisseur: Fournisseur;
  truck: string | Truck;
}
