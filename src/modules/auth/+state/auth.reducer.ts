import { createReducer, on } from '@ngrx/store';
import { User } from 'src/modules/api/interfaces';
import * as AuthActions from './auth.actions';

export const authFeatureKey = 'auth';

export interface AuthState {
  user: User | null;
  loading: boolean;
  loggedIn: boolean;
  error: any;
}

export const initialState: AuthState = {
  user: null,
  loading: false,
  loggedIn: false,
  error: null,
};

export const reducer = createReducer(
  initialState,
  on(AuthActions.login, (state) => {
    return { ...state, loading: true };
  }),
  on(AuthActions.loginSuccess, (state, action) => {
    return {
      ...state,
      user: action.user,
      loading: false,
      loggedIn: true,
    };
  }),
  on(AuthActions.getUser, (state) => {
    return { ...state, loading: true };
  }),
  on(AuthActions.getUserSuccess, (state, action) => {
    return { ...state, loading: false, user: action.user, loggedIn: true };
  }),
  on(AuthActions.loginFailure, (state, action) => ({
    ...state,
    error: action.error,
  })),
  on(AuthActions.resetError, (state) => ({ ...state, error: null }))
);
