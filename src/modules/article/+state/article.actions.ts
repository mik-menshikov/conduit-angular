import { createAction, props } from '@ngrx/store';
import { Article } from 'src/modules/api/interfaces';

export const loadArticle = createAction(
  '[Article] Load Article',
  props<{ slug: string }>()
);

export const loadArticleSuccess = createAction(
  '[Article] Load Article Success',
  props<{ article: Article }>()
);

export const loadArticleFailure = createAction(
  '[Article] Load Article Failure',
  props<{ error: any }>()
);
