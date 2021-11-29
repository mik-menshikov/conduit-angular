import { createAction, props } from '@ngrx/store';
import { Article, Comment, Profile } from 'src/modules/api/interfaces';

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

export const postComment = createAction(
  '[Article] Post Comment',
  props<{ slug: string; body: string }>()
);

export const postCommentSuccess = createAction(
  '[Article] Post Comment Success',
  props<{ comment: Comment }>()
);

export const postCommentFailure = createAction(
  '[Article] Post Comment Failure',
  props<{ error: any }>()
);

export const removeComment = createAction(
  '[Article] Remove Comment',
  props<{ slug: string; id: number }>()
);

export const removeCommentSuccess = createAction(
  '[Article] Remove Comment Success',
  props<{ id: number }>()
);

export const removeCommentFailure = createAction(
  '[Article] Remove Comment Failure',
  props<{ error: any }>()
);

export const toggleFollowUser = createAction(
  '[Article] Toggle Follow User',
  props<{ username: string }>()
);

export const toggleFollowUserSuccess = createAction(
  '[Article] Toggle Follow User Success',
  props<{ profile: Profile }>()
);
