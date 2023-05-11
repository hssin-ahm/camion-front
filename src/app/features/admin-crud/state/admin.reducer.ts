import { Action, createReducer, on } from '@ngrx/store';
import { getSingleAdminFail, getSingleAdminSuccess, loadAdminsSuccess } from './admin.actions';
import { AdminState, initialState } from './admin.state';

const _adminReducer = createReducer(
  initialState,
  on(loadAdminsSuccess, (state, action): AdminState => {
    return {
      ...state,
      admins: action.admins,
    };
  }),
  on(getSingleAdminSuccess, (state, action): AdminState => {
    return {
      ...state,
      admin: action.admin,
    };
  }),
  on(getSingleAdminFail, (state, action): AdminState => {
    return {
      ...state,
      admin: null,
    };
  })
);

export function AdminReducer(state: AdminState, action: Action) {
  return _adminReducer(state, action);
}
