import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { concatMap, map, switchMap } from 'rxjs/operators';
import { ApiService } from 'src/modules/api/api.service';
import * as HomeActions from './home.actions';

@Injectable()
export class HomeEffects {
  constructor(private actions$: Actions, private apiService: ApiService) {}

  loadTags$ = createEffect(() =>
    this.actions$.pipe(
      ofType(HomeActions.loadTags),
      concatMap((action) =>
        this.apiService
          .loadTags()
          .pipe(map((result) => HomeActions.loadTagsSuccess(result)))
      )
    )
  );

  loadArticles$ = createEffect(() =>
    this.actions$.pipe(
      ofType(HomeActions.loadArticleLists),
      switchMap((action) =>
        this.apiService
          .loadArticles(
            action.pageSize,
            action.page,
            action.tag,
            undefined,
            undefined,
            action.feed
          )
          .pipe(
            map((results) => {
              return HomeActions.loadArticleListsSuccess({
                articles: results.articles,
                totalPages: Math.ceil(results.articlesCount / action.pageSize),
              });
            })
          )
      )
    )
  );
}
