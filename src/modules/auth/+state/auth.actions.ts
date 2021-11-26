import { createAction, props } from '@ngrx/store';
import { LoginRequest, NewUser, User } from 'src/modules/api/interfaces';

export const login = createAction(
  '[Auth] login',
  props<{ data: LoginRequest }>()
);

export const loginSuccess = createAction(
  '[Auth] login Success',
  props<{ user: User }>()
);

export const loginFailure = createAction(
  '[Auth] login Failure',
  props<{ error: any }>()
);

export const register = createAction(
  '[Auth] register',
  props<{ user: NewUser }>()
);

export const registerSuccess = createAction(
  '[Auth] register Success',
  props<{ user: User }>()
);

export const registerFailure = createAction(
  '[Auth] register Failure',
  props<{ error: any }>()
);
export const getUser = createAction('[Auth] user');

export const getUserSuccess = createAction(
  '[Auth] user Success',
  props<{ user: User }>()
);
