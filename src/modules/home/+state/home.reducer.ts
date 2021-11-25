import { createFeature, createReducer, on } from '@ngrx/store';
import * as HomeActions from './home.actions';

export const homeFeatureKey = 'home';

export interface HomeState {
  tags: string[];
}

export const initialState: HomeState = {
  tags: [],
};

export const homeFeature = createFeature({
  name: 'home',
  reducer: createReducer(
    initialState,
    on(HomeActions.loadTagsSuccess, (state, action) => {
      return { ...state, tags: action.tags };
    })
  ),
});

export const { name, reducer, selectTags } = homeFeature;
