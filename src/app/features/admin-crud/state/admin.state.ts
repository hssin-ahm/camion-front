import { Admin } from '../models/admin.interface';

export interface AdminState {
  admins: Admin[] | null;
  admin: Admin | null;
}
export const initialState: AdminState = {
  admins: [],
  admin: undefined,
};
