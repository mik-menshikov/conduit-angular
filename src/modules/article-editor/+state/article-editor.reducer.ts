import { createReducer, createFeature, on } from '@ngrx/store';
import { UpdatableArticle } from 'src/modules/api/interfaces';
import * as ArticleEditorActions from './article-editor.actions';

export const articleEditorFeatureKey = 'articleEditor';

export interface ArticleEditorState {
  article: UpdatableArticle;
}

export const initialState: ArticleEditorState = {
  article: {
    slug: '',
    title: '',
    body: '',
    description: '',
    tagList: [],
  },
};

export const editorFeature = createFeature({
  name: 'articleEditor',
  reducer: createReducer(
    initialState,
    on(ArticleEditorActions.loadArticleSuccess, (state, action) => {
      return { ...state, article: { ...action.article } };
    }),
    on(ArticleEditorActions.changeArticle, (state, action) => ({
      ...state,
      article: action.article,
    })),
    on(ArticleEditorActions.resetArticle, (state, action) => ({
      ...state,
      article: initialState.article,
    }))
  ),
});

export const { name, reducer, selectArticle } = editorFeature;
