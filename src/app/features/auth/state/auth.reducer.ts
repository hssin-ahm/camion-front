import { Action, createReducer, on } from '@ngrx/store';
import { UserAuthService } from '../services/user-auth.service';
import {
  loginFail,
  loginSuccess,
  logout,
  resetPasswordFail,
  resetPasswordtokenverifFail,
  sendEmailFail,
  sendEmailSuccess,
} from './auth.actions';
import { AuthState, initialState } from './auth.state';

const _authReducer = createReducer(
  initialState,
  on(loginSuccess, (state, action): AuthState => {
    return {
      ...state,
      loginResponse: action.response,
    };
  }),
  on(loginFail, (state, action): AuthState => {
    return {
      ...state,
      validationErrors: action.error,
    };
  }),
  on(logout, (state) => {
    return {
      ...state,
      loginResponse: null,
    };
  }),
  on(sendEmailFail, (state, action): AuthState => {
    return {
      ...state,
      validationErrors: action.error,
    };
  }),
  on(resetPasswordFail, (state, action): AuthState => {
    return {
      ...state,
      validationErrors: action.error,
    };
  }),
  on(resetPasswordtokenverifFail, (state, action): AuthState => {
    return {
      ...state,
      validationErrors: action.error,
    };
  })
);

export function AuthReducer(state: AuthState, action: Action) {
  return _authReducer(state, action);
}
