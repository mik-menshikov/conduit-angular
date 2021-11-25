import { createAction, props } from '@ngrx/store';
import { UpdatableArticle } from 'src/modules/api/interfaces';

export const publishArticle = createAction('[ArticleEditor] Publish Article');

export const updateArticle = createAction('[ArticleEditor] Update Article');

export const changeArticle = createAction(
  '[ArticleEditor] Change Article',
  props<{ article: UpdatableArticle }>()
);

export const resetArticle = createAction('[ArticleEditor] Reset Article');

export const loadArticle = createAction(
  '[ArticleEditor] Load Article',
  props<{ slug: string }>()
);

export const loadArticleSuccess = createAction(
  '[ArticleEditor] Load Article Success',
  props<{ article: UpdatableArticle }>()
);

export const loadArticleFailure = createAction(
  '[ArticleEditor] Load Article Failure',
  props<{ error: any }>()
);
