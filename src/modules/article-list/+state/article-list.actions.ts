import { createAction, props } from '@ngrx/store';
import { Article } from 'src/modules/api/interfaces';

export const loadArticleLists = createAction('[ArticleList] Load ArticleLists');

export const loadArticleListsSuccess = createAction(
  '[ArticleList] Load ArticleLists Success',
  props<{ articles: Article[]; articlesCount: number }>()
);

export const loadArticleListsFailure = createAction(
  '[ArticleList] Load ArticleLists Failure',
  props<{ error: any }>()
);
