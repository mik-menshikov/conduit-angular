import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { switchMap, map } from 'rxjs/operators';
import { ApiService } from 'src/modules/api/api.service';

import * as ArticleActions from './article.actions';

@Injectable()
export class ArticleEffects {
  constructor(private actions$: Actions, private apiService: ApiService) {}

  loadArticle$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ArticleActions.loadArticle),
      switchMap((action) => {
        return this.apiService
          .loadArticle(action.slug)
          .pipe(map((result) => ArticleActions.loadArticleSuccess(result)));
      })
    )
  );
}
