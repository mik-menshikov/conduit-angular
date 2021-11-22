import { createReducer, on } from '@ngrx/store';
import { User } from 'src/modules/api/interfaces';
import * as AuthActions from './auth.actions';

export const authFeatureKey = 'auth';

export interface AuthState {
  [authFeatureKey]: {
    user: User | null;
    loading: boolean;
    loggedIn: boolean;
  };
}

export const initialState: AuthState = {
  [authFeatureKey]: { user: null, loading: false, loggedIn: false },
};

export const reducer = createReducer(
  initialState,
  on(AuthActions.login, (state, _) => {
    const authState = state[authFeatureKey];
    return { ...state, [authFeatureKey]: { ...authState, loading: true } };
  }),
  on(AuthActions.loginSuccess, (state, action) => {
    return {
      ...state,
      [authFeatureKey]: {
        user: action.user,
        loading: false,
        loggedIn: true,
      },
    };
  }),
  on(AuthActions.getUser, (state, action) => {
    const authState = state[authFeatureKey];
    return { ...state, [authFeatureKey]: { ...authState, loading: true } };
  }),
  on(AuthActions.getUserSuccess, (state, action) => {
    const authState = state[authFeatureKey];
    return {
      ...state,
      [authFeatureKey]: { ...authState, loading: false, user: action.user },
    };
  })
);
