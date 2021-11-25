import { createFeatureSelector, createSelector } from '@ngrx/store';
import {
  articleListFeatureKey,
  ArticlesState,
} from 'src/modules/article-list/+state/article-list.reducer';

const getArticleList = createFeatureSelector<ArticlesState>(
  articleListFeatureKey
);

export const selectArticles = createSelector(getArticleList, (state) => {
  return state.entries;
});

export const selectTotalPages = createSelector(getArticleList, (state) => {
  return state.totalPages;
});

export const selectFilter = createSelector(getArticleList, (state) => {
  return state.filter;
});

export const isLoading = createSelector(
  getArticleList,
  (state) => state.loading
);
