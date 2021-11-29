import { Injectable } from '@angular/core';
import { Actions, concatLatestFrom, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { iif } from 'rxjs';
import { concatMap, exhaustMap, map, switchMap } from 'rxjs/operators';
import { ApiService } from 'src/modules/api/api.service';
import { selectCurrentProfile } from 'src/modules/profile/+state/profile.reducer';
import * as ProfileActions from './profile.actions';

@Injectable()
export class ProfileEffects {
  constructor(
    private actions$: Actions,
    private apiService: ApiService,
    private store: Store
  ) {}

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

  toggleFollowUser$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ProfileActions.toggleFollowUser),
      concatLatestFrom(() => this.store.select(selectCurrentProfile)),
      exhaustMap(([action, profile]) => {
        return profile?.following
          ? this.apiService.unfollowUser(action.username)
          : this.apiService.followUser(action.username);
      }),
      map((result) => ProfileActions.toggleFollowUserSuccess(result))
    )
  );
}
