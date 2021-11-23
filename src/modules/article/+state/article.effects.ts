import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { switchMap, map, concatMap, withLatestFrom } from 'rxjs/operators';
import { ApiService } from 'src/modules/api/api.service';

import * as ArticleActions from './article.actions';

@Injectable()
export class ArticleEffects {
  constructor(private actions$: Actions, private apiService: ApiService) {}

  loadArticle$ = createEffect(() => {
    const loadAction$ = this.actions$.pipe(ofType(ArticleActions.loadArticle));

    return loadAction$.pipe(
      switchMap((action) => this.apiService.loadArticle(action.slug)),
      withLatestFrom(loadAction$),
      switchMap(([result, action]) => [
        ArticleActions.loadArticleSuccess(result),
        ArticleActions.loadComments({ slug: action.slug }),
      ])
    );
  });

  loadComments$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ArticleActions.loadComments),
      concatMap((action) =>
        this.apiService
          .loadComments(action.slug)
          .pipe(
            map((result) =>
              ArticleActions.loadCommentsSuccess({ comments: result.comments })
            )
          )
      )
    )
  );
}
