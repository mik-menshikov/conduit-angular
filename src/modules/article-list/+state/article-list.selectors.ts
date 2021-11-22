import { createFeatureSelector, createSelector } from '@ngrx/store';
import {
  articleListFeatureKey,
  ArticleListState,
  ArticlesState,
} from 'src/modules/article-list/+state/article-list.reducer';

const getArticleList = createFeatureSelector<ArticleListState>(
  articleListFeatureKey
);

export const getArticles = createSelector(
  getArticleList,
  (state: ArticleListState) => {
    return state[articleListFeatureKey].entries;
  }
);

export const isLoading = createSelector(
  getArticleList,
  (state: ArticleListState) => state[articleListFeatureKey].loading
);
