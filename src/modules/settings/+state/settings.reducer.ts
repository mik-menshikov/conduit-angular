import { Action, createFeature, createReducer, on } from '@ngrx/store';
import * as UserActions from './settings.actions';

export type RequestStatus = 'loaded' | 'loading' | 'error';

export const settingsFeatureKey = 'settings';

export interface SettingsState {
  error: any;
  status: RequestStatus;
}

export const initialState: SettingsState = {
  status: 'loaded',
  error: null,
};

export const settingsFeature = createFeature({
  name: settingsFeatureKey,
  reducer: createReducer(
    initialState,
    on(UserActions.updateUser, (state) => ({
      ...state,
      status: 'loading',
    })),
    on(UserActions.updateUserSuccess, (state) => ({
      ...state,
      status: 'loaded',
    })),
    on(UserActions.updateUserFailure, (state, action) => ({
      ...state,
      error: action.error,
      status: 'error',
    }))
  ),
});

export const { name, selectError, selectStatus } = settingsFeature;
