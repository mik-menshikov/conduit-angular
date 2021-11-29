import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { concatMap, exhaustMap, map, switchMap } from 'rxjs/operators';
import { ApiService } from 'src/modules/api/api.service';
import * as ProfileActions from './profile.actions';

@Injectable()
export class ProfileEffects {
  constructor(private actions$: Actions, private apiService: ApiService) {}

  loadProfile$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ProfileActions.loadProfile),
      concatMap((action) =>
        this.apiService
          .loadProfile(action.username)
          .pipe(map((results) => ProfileActions.loadProfileSuccess(results)))
      )
    )
  );

  loadArticles$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ProfileActions.loadProfileArticles),
      switchMap((action) =>
        this.apiService
          .loadArticles(
            action.pageSize,
            action.page,
            undefined,
            action.username,
            undefined
          )
          .pipe(
            map((results) => {
              return ProfileActions.loadProfileArticlesSuccess({
                articles: results.articles,
                totalPages: Math.ceil(results.articlesCount / action.pageSize),
                page: action.page,
              });
            })
          )
      )
    )
  );

  loadFavoritedArticles$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ProfileActions.loadFavoritedArticles),
      switchMap((action) =>
        this.apiService
          .loadArticles(
            action.pageSize,
            action.page,
            undefined,
            undefined,
            action.username
          )
          .pipe(
            map((results) => {
              return ProfileActions.loadFavoritedArticlesSuccess({
                articles: results.articles,
                totalPages: Math.ceil(results.articlesCount / action.pageSize),
                page: action.page,
              });
            })
          )
      )
    )
  );

  followUser$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ProfileActions.followUser),
      exhaustMap((action) => this.apiService.followUser(action.username)),
      map((result) => ProfileActions.followUserSuccess(result))
    )
  );

  unfollowUser$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ProfileActions.unfollowUser),
      exhaustMap((action) => this.apiService.unfollowUser(action.username)),
      map((result) => ProfileActions.unfollowUserSuccess(result))
    )
  );
}
