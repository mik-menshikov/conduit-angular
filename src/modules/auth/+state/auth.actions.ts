import { createAction, props } from '@ngrx/store';
import { LoginRequest, User } from 'src/modules/api/interfaces';

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
