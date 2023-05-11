import { Fournisseur } from './founisseur.interface';

export interface Intervention {
  _id: string;
  type: string;
  price: number;
  date: string;
  invoice_ref: string;
  description: string;
  truck: string;
  fournisseur: Fournisseur;
}
