import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, concatLatestFrom, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { concatMap, map } from 'rxjs/operators';
import { ApiService } from 'src/modules/api/api.service';
import { ChangedArticle, UpdatableArticle } from 'src/modules/api/interfaces';
import { selectArticle } from 'src/modules/article-editor/+state/article-editor.reducer';
import * as ArticleEditorActions from './article-editor.actions';

function toChangedArticle(article: UpdatableArticle): ChangedArticle {
  return {
    title: article.title,
    description: article.description,
    body: article.description,
    tagList: article.tagList,
  };
}
@Injectable()
export class ArticleEditorEffects {
  constructor(
    private actions$: Actions,
    private apiService: ApiService,
    private router: Router,
    private store: Store
  ) {}

  publishArticle$ = createEffect(() =>
    this.actions$.pipe(
      ofType(
        ArticleEditorActions.publishArticle,
        ArticleEditorActions.updateArticle
      ),
      concatLatestFrom(() => this.store.select(selectArticle)),
      concatMap(([action, article]) => {
        if (action.type === ArticleEditorActions.updateArticle.type) {
          return this.apiService.updateArticle(
            article.slug,
            toChangedArticle(article)
          );
        }
        return this.apiService.publishArticle(toChangedArticle(article));
      }),
      map((result) => {
        this.router.navigateByUrl(`/article/${result.article.slug}`);
        return ArticleEditorActions.resetArticle();
      })
    )
  );

  loadArticle$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ArticleEditorActions.loadArticle),
      concatMap((action) =>
        this.apiService.loadArticle(action.slug).pipe(
          map((result) =>
            ArticleEditorActions.loadArticleSuccess({
              article: {
                slug: result.article.slug,
                title: result.article.title,
                description: result.article.description,
                body: result.article.body,
                tagList: result.article.tagList,
              },
            })
          )
        )
      )
    )
  );
}
