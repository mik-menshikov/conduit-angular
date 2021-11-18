import { createReducer, on } from '@ngrx/store';
import { Article } from 'src/modules/api/interfaces';
import * as ArticleListActions from './article-list.actions';

export const articleListFeatureKey = 'article-list';

export interface ArticlesState {
  entries: Article[];
  count: number;
  loading: boolean;
}

export interface ArticleListState {
  [articleListFeatureKey]: ArticlesState;
}

export const initialState: ArticleListState = {
  [articleListFeatureKey]: {
    entries: [],
    count: 0,
    loading: false,
  },
};

export const reducer = createReducer(
  initialState,
  on(ArticleListActions.loadArticleLists, (state, _) => {
    return {
      ...state,
      [articleListFeatureKey]: { loading: true, entries: [], count: 0 },
    };
  }),
  on(ArticleListActions.loadArticleListsSuccess, (state, action) => {
    return {
      ...state,
      [articleListFeatureKey]: {
        entries: action.articles,
        count: action.articlesCount,
        loading: false,
      },
    };
  })
);
