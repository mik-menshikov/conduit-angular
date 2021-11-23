import { createFeatureSelector, createSelector } from '@ngrx/store';
import {
  articleFeatureKey,
  ArticleState,
} from 'src/modules/article/+state/article.reducer';

const getArticleState = createFeatureSelector<ArticleState>(articleFeatureKey);

const getArticle = createSelector(
  getArticleState,
  (state) => state.currentArticle
);

const getComments = createSelector(
  getArticleState,
  (state) => state.currentComments
);

const isArticleLoading = createSelector(
  getArticleState,
  (state) => state.loading
);

export const ArticleSelectors = {
  getArticle,
  isArticleLoading,
  getComments,
};
