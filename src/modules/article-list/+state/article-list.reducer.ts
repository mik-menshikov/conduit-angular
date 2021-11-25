import { createReducer, on } from '@ngrx/store';
import { Article } from 'src/modules/api/interfaces';
import * as ArticleListActions from './article-list.actions';

const PAGE_SIZE = 5;

export const articleListFeatureKey = 'article-list';

export type Feed = 'all' | 'user';

export interface ArticlesFilter {
  tag: string;
  feed: Feed;
  page: number;
}

export interface ArticlesState {
  entries: Article[];
  loading: boolean;
  totalPages: number;
  pageSize: number;
  filter: ArticlesFilter;
}

export const initialState: ArticlesState = {
  entries: [],
  totalPages: 1,
  pageSize: PAGE_SIZE,
  loading: false,
  filter: {
    tag: '',
    feed: 'all',
    page: 1,
  },
};

export const reducer = createReducer(
  initialState,
  on(ArticleListActions.loadArticleLists, (state, action) => {
    const filter: ArticlesFilter = {
      page: action.page ?? 1,
      feed: action.feed ?? 'all',
      tag: action.tag ?? '',
    };
    return {
      ...state,
      loading: true,
      filter,
    };
  }),
  on(ArticleListActions.loadArticleListsSuccess, (state, action) => {
    return {
      ...state,
      entries: action.articles,
      totalPages: action.totalPages,
      loading: false,
    };
  })
);
