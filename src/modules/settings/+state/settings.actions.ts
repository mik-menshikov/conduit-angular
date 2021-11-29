import { createAction, props } from '@ngrx/store';
import { ChangedUser } from 'src/modules/api/interfaces';

export const updateUser = createAction(
  '[Settings] Update User',
  props<{ user: ChangedUser }>()
);

export const updateUserSuccess = createAction('[Settings] Update User Success');

export const updateUserFailure = createAction(
  '[Settings] Update User Failure',
  props<{ error: any }>()
);
