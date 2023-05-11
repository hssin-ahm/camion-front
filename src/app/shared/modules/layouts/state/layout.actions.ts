import { createAction, props } from '@ngrx/store';
import { CurrentUser } from '../model/currentUser.interface';

export const GET_ME = '[header] get me';
export const GET_ME_START = '[header] get me start';

export const getMe = createAction(
  GET_ME,
  props<{ currentUser: CurrentUser }>()
);
export const getMeStart = createAction(GET_ME_START);
