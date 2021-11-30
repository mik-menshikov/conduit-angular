import { createReducer, on } from '@ngrx/store';
import { Article, Comment } from 'src/modules/api/interfaces';
import * as ArticleActions from './article.actions';

export const articleFeatureKey = 'article';

export interface ArticleState {
  currentArticle: Article | null;
  currentComments: Comment[];
  loading: boolean;
}

export interface ArticleRootState {
  readonly [articleFeatureKey]: ArticleState;
}

export const initialState: ArticleState = {
  currentArticle: null,
  currentComments: [],
  loading: false,
};

export const reducer = createReducer(
  initialState,
  on(ArticleActions.loadArticleSuccess, (state, action) => ({
    ...state,
    currentArticle: action.article,
    currentComments: [],
    loading: false,
  })),
  on(ArticleActions.loadCommentsSuccess, (state, action) => {
    return { ...state, currentComments: action.comments };
  }),
  on(ArticleActions.postCommentSuccess, (state, action) => {
    return {
      ...state,
      currentComments: [...state.currentComments, action.comment],
    };
  }),
  on(ArticleActions.removeCommentSuccess, (state, action) => {
    return {
      ...state,
      currentComments: state.currentComments.filter(
        (comment) => comment.id !== action.id
      ),
    };
  }),
  on(ArticleActions.toggleFollowUserSuccess, (state, action) => {
    const article = {
      ...state.currentArticle,
      author: action.profile,
    } as Article;
    return { ...state, currentArticle: article };
  })
);
