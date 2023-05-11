import { createFeatureSelector, createSelector } from '@ngrx/store';
import { AuthState } from './auth.state';

export const AUTH_STATE_NAME = 'auth';

export const authFeatureSelector = createFeatureSelector<AuthState>('auth');
export const validationsErrorSelector = createSelector(
  authFeatureSelector,
  (authState: AuthState) => authState.validationErrors
);
export const loginResponse = createSelector(
  authFeatureSelector,
  (authState: AuthState) => authState.loginResponse.success
);
