import { createAction, props } from '@ngrx/store';
import { Article, Comment } from 'src/modules/api/interfaces';

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

export const loadComments = createAction(
  '[Article] Load Comments',
  props<{ slug: string }>()
);

export const loadCommentsSuccess = createAction(
  '[Article] Load Comments Success',
  props<{ comments: Comment[] }>()
);

export const loadCommentsFailure = createAction(
  '[Article] Load Comments Failure',
  props<{ error: any }>()
);
