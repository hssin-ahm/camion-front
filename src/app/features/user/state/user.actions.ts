import { createAction, props } from '@ngrx/store';
export const UPDATE_LOGGED_USER =
  '[update logged user page] update logged user';
export const UPDATE_LOGGED_USER_SUCCESS =
  '[update logged user page] update logged user success';

export const CHANGE_USER_PASSWORD =
  '[change user password page] change user password';
export const CHANGE_USER_PASSWORD_SUCCESS =
  '[change user password page] change user password success';

export const CHANGE_USER_PASSWORD_FAIL =
  '[change user password page] change user password fail';

export const updateLoggedUser = createAction(
  UPDATE_LOGGED_USER,
  props<{ user }>()
);
export const updateLoggedUserSuccess = createAction(UPDATE_LOGGED_USER_SUCCESS);

export const changeUserPassword = createAction(
  CHANGE_USER_PASSWORD,
  props<{ password }>()
);
export const changeUserPasswordSuccess = createAction(
  CHANGE_USER_PASSWORD_SUCCESS
);
export const changeUserPasswordFail = createAction(
  CHANGE_USER_PASSWORD_FAIL,
  props<{ error }>()
);
