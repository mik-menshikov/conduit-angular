import { Injectable } from '@angular/core';
import { Actions, concatLatestFrom, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { throwError } from 'rxjs';
import { concatMap, exhaustMap, map, switchMap } from 'rxjs/operators';
import { ApiService } from 'src/modules/api/api.service';
import { selectArticles } from 'src/modules/home/+state/home.reducer';
import * as HomeActions from './home.actions';

@Injectable()
export class HomeEffects {
  constructor(
    private actions$: Actions,
    private apiService: ApiService,
    private store: Store
  ) {}

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

  toggleFavorite$ = createEffect(() =>
    this.actions$.pipe(
      ofType(HomeActions.toggleFavorite),
      concatLatestFrom(() => this.store.select(selectArticles)),
      exhaustMap(([action, articles]) => {
        const foundArticle = articles.find(
          (article) => article.slug === action.slug
        );

        if (!foundArticle) return throwError('Article not found in the store');

        return foundArticle.favorited
          ? this.apiService.unfavoriteArticle(action.slug)
          : this.apiService.favoriteArticle(action.slug);
      }),
      map((result) => HomeActions.toggleFavoriteSuccess(result))
    )
  );
}
