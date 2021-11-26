import { createFeature, createReducer, on } from '@ngrx/store';
import { Article, Profile } from 'src/modules/api/interfaces';
import * as ProfileActions from './profile.actions';

export const profileFeatureKey = 'profile';

export interface ArticleListState {
  entries: Article[];
  totalPages: number;
  page: number;
}

export interface ProfileState {
  currentProfile: Profile | undefined;
  userArticles: ArticleListState | undefined;
  favoritedArticles: ArticleListState | undefined;
}

export const initialState: ProfileState = {
  currentProfile: undefined,
  userArticles: undefined,
  favoritedArticles: undefined,
};

export const profileFeature = createFeature({
  name: 'profile',
  reducer: createReducer(
    initialState,
    on(ProfileActions.loadProfileSuccess, (state, action) => ({
      ...state,
      currentProfile: action.profile,
    })),
    on(ProfileActions.loadProfileArticlesSuccess, (state, action) => ({
      ...state,
      userArticles: {
        entries: action.articles,
        page: action.page,
        totalPages: action.totalPages,
      },
    })),
    on(ProfileActions.loadFavoritedArticlesSuccess, (state, action) => ({
      ...state,
      favoritedArticles: {
        entries: action.articles,
        page: action.page,
        totalPages: action.totalPages,
      },
    }))
  ),
});

export const {
  name,
  reducer,
  selectCurrentProfile,
  selectUserArticles,
  selectFavoritedArticles,
} = profileFeature;
