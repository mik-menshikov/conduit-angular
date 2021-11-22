import { createFeatureSelector, createSelector } from '@ngrx/store';
import {
  articleFeatureKey,
  ArticleState,
} from 'src/modules/article/+state/article.reducer';

const getArticleState = createFeatureSelector<ArticleState>(articleFeatureKey);

const getArticle = createSelector(
  getArticleState,
  (state) => state[articleFeatureKey].currentArticle
);

const isArticleLoading = createSelector(
  getArticleState,
  (state) => state[articleFeatureKey].loading
);

export const ArticleSelectors = {
  getArticle,
  isArticleLoading,
};
