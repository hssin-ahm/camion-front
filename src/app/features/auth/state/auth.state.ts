import { BackendErrorsInterface } from 'src/app/shared/modules/backendErrorMessages/model/backendErrors.interface';
import { LoginResponceInterface } from '../models/loginResponse.interface';

export interface AuthState {
  loginResponse: LoginResponceInterface | null;
  validationErrors: BackendErrorsInterface | null;
}
export const initialState: AuthState = {
  loginResponse: null,
  validationErrors: null,
};
