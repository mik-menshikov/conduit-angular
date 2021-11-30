import { createAction, props } from '@ngrx/store';
import { Article } from 'src/modules/api/interfaces';
import { Feed } from 'src/modules/home/+state/home.reducer';

export const loadTags = createAction('[Home] Load Tags');

export const loadTagsSuccess = createAction(
  '[Home] Load Tags Success',
  props<{ tags: string[] }>()
);

export const loadTagsFailure = createAction(
  '[Home] Load Tags Failure',
  props<{ error: any }>()
);

export const changeFilter = createAction(
  '[Home] Change Filter',
  props<{ pageSize: number; page?: number; tag?: string; feed?: Feed }>()
);

export const loadArticleLists = createAction(
  '[Home] Load ArticleLists',
  props<{ pageSize: number; page?: number; tag?: string; feed?: Feed }>()
);

export const loadArticleListsSuccess = createAction(
  '[Home] Load ArticleLists Success',
  props<{ articles: Article[]; totalPages: number }>()
);

export const loadArticleListsFailure = createAction(
  '[Home] Load ArticleLists Failure',
  props<{ error: any }>()
);

export const toggleFavorite = createAction(
  '[Home] Toggle Favorite',
  props<{ slug: string }>()
);

export const toggleFavoriteSuccess = createAction(
  '[Home] Toggle Favorite Success',
  props<{ article: Article }>()
);
