import { createAction, props } from '@ngrx/store';
import { Article } from 'src/modules/api/interfaces';
import { Feed } from 'src/modules/article-list/+state/article-list.reducer';

export const changeFilter = createAction(
  '[ArticleList] Change Filter',
  props<{ pageSize: number; page?: number; tag?: string; feed?: Feed }>()
);

export const loadArticleLists = createAction(
  '[ArticleList] Load ArticleLists',
  props<{ pageSize: number; page?: number; tag?: string; feed?: Feed }>()
);

export const loadArticleListsSuccess = createAction(
  '[ArticleList] Load ArticleLists Success',
  props<{ articles: Article[]; totalPages: number }>()
);

export const loadArticleListsFailure = createAction(
  '[ArticleList] Load ArticleLists Failure',
  props<{ error: any }>()
);
