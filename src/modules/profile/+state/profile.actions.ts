import { createAction, props } from '@ngrx/store';
import { Article, Profile } from 'src/modules/api/interfaces';

interface LoadArticlesActionPayload {
  username: string;
  page: number;
  pageSize: number;
}

interface LoadArticlesSuccessActionPayload {
  articles: Article[];
  totalPages: number;
  page: number;
}

export const loadProfile = createAction(
  '[Profile] Load Profile',
  props<{ username: string }>()
);

export const loadProfileSuccess = createAction(
  '[Profile] Load Profile Success',
  props<{ profile: Profile }>()
);

export const loadProfileFailure = createAction(
  '[Profile] Load Profile Failure',
  props<{ error: any }>()
);

export const loadProfileArticles = createAction(
  '[Profile] Load Profile Articles',
  props<LoadArticlesActionPayload>()
);

export const loadFavoritedArticles = createAction(
  '[Profile] Load Favorited Articles',
  props<LoadArticlesActionPayload>()
);

export const loadProfileArticlesSuccess = createAction(
  '[Profile] Load Profile Articles Success',
  props<LoadArticlesSuccessActionPayload>()
);

export const loadFavoritedArticlesSuccess = createAction(
  '[Profile] Load Favorited Articles Success',
  props<LoadArticlesSuccessActionPayload>()
);

export const loadProfileArticlesFailure = createAction(
  '[Profile] Load Profile Articles Failure',
  props<{ error: any }>()
);

export const toggleFollowUser = createAction(
  '[Profile] Toggle Follow User',
  props<{ username: string }>()
);

export const toggleFollowUserSuccess = createAction(
  '[Profile] Toggle Follow User Success',
  props<{ profile: Profile }>()
);

export const toggleFavorite = createAction(
  '[Profile] Toggle Favorite',
  props<{ slug: string }>()
);

export const toggleFavoriteSuccess = createAction(
  '[Profile] Toggle Favorite Success',
  props<{ article: Article }>()
);
