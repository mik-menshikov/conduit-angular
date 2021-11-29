import { createFeature, createReducer, on } from '@ngrx/store';
import { Article } from 'src/modules/api/interfaces';
import * as HomeActions from './home.actions';

export const homeFeatureKey = 'home';

export type Feed = 'all' | 'user';

export interface ArticlesFilter {
  tag: string;
  feed: Feed;
  page: number;
}

export interface HomeState {
  tags: string[];
  articles: Article[];
  loading: boolean;
  totalPages: number;
  pageSize: number;
  filter: ArticlesFilter;
}

export const initialState: HomeState = {
  tags: [],
  articles: [],
  totalPages: 1,
  pageSize: 1,
  loading: false,
  filter: {
    tag: '',
    feed: 'all',
    page: 1,
  },
};

export const homeFeature = createFeature({
  name: 'home',
  reducer: createReducer(
    initialState,
    on(HomeActions.loadTagsSuccess, (state, action) => {
      return { ...state, tags: action.tags };
    }),
    on(HomeActions.loadArticleLists, (state, action) => {
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
    on(HomeActions.loadArticleListsSuccess, (state, action) => {
      return {
        ...state,
        articles: action.articles,
        totalPages: action.totalPages,
        loading: false,
      };
    })
  ),
});

export const {
  name,
  reducer,
  selectTags,
  selectArticles,
  selectTotalPages,
  selectFilter,
  selectLoading,
} = homeFeature;
