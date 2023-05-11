import { createAction, props } from '@ngrx/store';
import { BackendErrorsInterface } from 'src/app/shared/modules/backendErrorMessages/model/backendErrors.interface';
import { ForgotPasswordRequest } from '../models/forgotPasswordRequest.interface';
import { LoginRequestInterface } from '../models/loginRequest.interface';
import { LoginResponceInterface } from '../models/loginResponse.interface';
import { ResetPasswordRequest } from '../models/resetPasswordRequest.interface';

export const LOGIN_START = '[auth page] login start';
export const LOGIN_SUCCESS = '[auth page] login success';
export const LOGIN_FAIL = '[auth page] login fail';
export const LOGOUT_ACTION = '[auth page] logout';
export const FORGOT_PASSWORD_START =
  '[forgotPassword page] forgot password start';
export const SEND_EMAIL_SUCCESS = '[forgotPassword page] send email success';
export const SEND_EMAIL_FAIL = '[forgotPassword page] send email fail';

export const RESET_PASSWORD_TOKEN_VERIF_START =
  '[resetPassword page] reset password token verif start';
export const RESET_PASSWORD_TOKEN_VERIF_FAIL =
  '[resetPassword page] reset password token verif fail';

export const RESET_PASSWORD_START = '[resetPassword page] reset password start';
export const RESET_PASSWORD_FAIL = '[resetPassword page] reset password fail';

export const loginStart = createAction(
  LOGIN_START,
  props<{ request: LoginRequestInterface }>()
);

export const loginSuccess = createAction(
  LOGIN_SUCCESS,
  props<{ response: LoginResponceInterface }>()
);

export const loginFail = createAction(
  LOGIN_FAIL,
  props<{ error: BackendErrorsInterface }>()
);
export const logout = createAction(LOGOUT_ACTION);

export const forgotPasswordStart = createAction(
  FORGOT_PASSWORD_START,
  props<{ forgotPasswordRequest: ForgotPasswordRequest }>()
);
export const sendEmailSuccess = createAction(
  SEND_EMAIL_SUCCESS,
  props<{ response: any }>()
);
export const sendEmailFail = createAction(
  SEND_EMAIL_FAIL,
  props<{ error: BackendErrorsInterface }>()
);

export const resetPasswordtokenverifStart = createAction(
  RESET_PASSWORD_TOKEN_VERIF_START,
  props<{ token: String }>()
);
export const resetPasswordtokenverifFail = createAction(
  RESET_PASSWORD_TOKEN_VERIF_FAIL,
  props<{ error: BackendErrorsInterface }>()
);

export const resetPasswordStart = createAction(
  RESET_PASSWORD_START,
  props<{ resetPasswordRequest: ResetPasswordRequest }>()
);
export const resetPasswordFail = createAction(
  RESET_PASSWORD_FAIL,
  props<{ error: BackendErrorsInterface }>()
);
