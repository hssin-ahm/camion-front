import { createFeatureSelector, createSelector } from '@ngrx/store';
import { AdminState } from './admin.state';

export const ADMIN_STATE_NAME = 'admin';

export const adminFeatureSelector =
  createFeatureSelector<AdminState>(ADMIN_STATE_NAME);
export const getAdmins = createSelector(
  adminFeatureSelector,
  (AdminState: AdminState) => AdminState.admins
);

export const getSigleAdminSelector = createSelector(
  adminFeatureSelector,
  (adminState: AdminState) => adminState.admin
);
