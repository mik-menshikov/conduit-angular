import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';

import { ApiService } from 'src/modules/api/api.service';
import * as ArticleListActions from './article-list.actions';
import { switchMap, map } from 'rxjs/operators';

@Injectable()
export class ArticleListEffects {
  constructor(private actions$: Actions, private apiService: ApiService) {}

  loadArticles$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ArticleListActions.loadArticleLists),
      switchMap((action) =>
        this.apiService
          .loadArticles(action.pageSize, action.page, action.tag, action.feed)
          .pipe(
            map((results) => {
              return ArticleListActions.loadArticleListsSuccess({
                articles: results.articles,
                totalPages: Math.ceil(results.articlesCount / action.pageSize),
              });
            })
          )
      )
    )
  );
}
