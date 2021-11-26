import { createFeatureSelector, createSelector } from '@ngrx/store';
import {
  authFeatureKey,
  AuthState,
} from 'src/modules/auth/+state/auth.reducer';

const getAuth = createFeatureSelector<AuthState>(authFeatureKey);

const isLoggedIn = createSelector(
  getAuth,
  (state: AuthState) => state[authFeatureKey].loggedIn
);

const getUser = createSelector(
  getAuth,
  (state: AuthState) => state[authFeatureKey].user
);

export const AuthSelectors = {
  isLoggedIn,
  getUser,
};
