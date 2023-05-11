import { createAction, props } from '@ngrx/store';
import { Admin } from '../models/admin.interface';

export const DELETE_ADMIN_ACTION = '[admins page] delete admin';
export const DELETE_ADMIN_SUCCESS = '[admins page] delete admin success';
export const LOAD_ADMINS = '[admins page] load admins';
export const LOAD_ADMINS_SUCCESS = '[admins page] load admins success';
export const SEARCH_ADMINS = '[admins page] search admins';
export const SEARCH_ADMINS_SUCCESS = '[admins page] Search admins success';
export const LOAD_ADMINS_MODEL = '[Add admin page] load model admins';
export const LOAD_ADMINS_MODEL_SUCCESS =
  '[Add admin page] load admins model success';

// Form admin
export const ADD_ADMIN_ACTION = '[add admin page] add admin';
export const ADD_ADMIN_SUCCESS = '[add admin page] add admin success';
export const ADD_ADMIN_FAIL = '[add admin page] add admin fail';
export const GET_SINGLE_ADMIN = '[Add admin page] get single admin';
export const GET_SINGLE_ADMIN_SUCCESS =
  '[Add admin page] get single admin success';
export const GET_SINGLE_ADMIN_FAIL = '[Add admin page] get single admin fail';
export const UPDATE_ADMIN = '[Add admin page] update admin';
export const UPDATE_ADMIN_SUCCESS = '[Add admin page] update admin success';

export const GET_ADMIN_MISSION_HISTORY =
  '[mission history page] get mission admin history';
export const GET_MISSIONS_ADMIN_HISTORY_SUCCESS =
  '[mission history page] get mission admin history success';

export const deleteAdmin = createAction(
  DELETE_ADMIN_ACTION,
  props<{ id; page; limit }>()
);
export const deleteAdminSuccess = createAction(DELETE_ADMIN_SUCCESS);

export const loadAdmins = createAction(
  LOAD_ADMINS,
  props<{
    page: number;
    limit: number;
    searchField?;
    value?;
  }>()
);
export const loadAdminsSuccess = createAction(
  LOAD_ADMINS_SUCCESS,
  props<{ admins: Admin[] }>()
);
export const searchAdmins = createAction(
  SEARCH_ADMINS,
  props<{ value: string }>()
);
export const searchAdminsSuccess = createAction(
  SEARCH_ADMINS_SUCCESS,
  props<{ admins: Admin[] }>()
);

// form admin
export const addAdmin = createAction(ADD_ADMIN_ACTION, props<{ admin }>());

export const addAdminSuccess = createAction(
  ADD_ADMIN_SUCCESS,
  props<{ admin_id: number }>()
);

export const addAdminFail = createAction(
  ADD_ADMIN_FAIL,
  // props<{ admin_id: number }>()
);

export const getSingleAdmin = createAction(GET_SINGLE_ADMIN, props<{ id }>());
export const getSingleAdminSuccess = createAction(
  GET_SINGLE_ADMIN_SUCCESS,
  props<{ admin }>()
);
export const getSingleAdminFail = createAction(GET_SINGLE_ADMIN_FAIL);
export const updateAdmin = createAction(UPDATE_ADMIN, props<{ admin }>());
export const updateAdminSuccess = createAction(UPDATE_ADMIN_SUCCESS);

export const getAdminMissionHistory = createAction(
  GET_ADMIN_MISSION_HISTORY,
  props<{ admin_id; page: number; limit: number; searchField?; value? }>()
);
