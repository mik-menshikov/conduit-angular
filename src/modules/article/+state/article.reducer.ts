import { Action, createReducer, on } from '@ngrx/store';
import { Article } from 'src/modules/api/interfaces';
import * as ArticleActions from './article.actions';

export const articleFeatureKey = 'article';

export interface ArticleState {
  [articleFeatureKey]: {
    currentArticle: Article | null;
    loading: boolean;
  };
}

export const initialState: ArticleState = {
  [articleFeatureKey]: {
    currentArticle: null,
    loading: false,
  },
};

export const reducer = createReducer(
  initialState,
  on(ArticleActions.loadArticle, (state, action) => ({
    ...state,
    [articleFeatureKey]: { currentArticle: null, loading: true },
  })),
  on(ArticleActions.loadArticleSuccess, (state, action) => ({
    ...state,
    [articleFeatureKey]: {
      currentArticle: action.article,
      loading: false,
    },
  }))
);
