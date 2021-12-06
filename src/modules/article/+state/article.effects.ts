import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, concatLatestFrom, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import {
  switchMap,
  map,
  concatMap,
  withLatestFrom,
  mergeMap,
  exhaustMap,
  tap,
} from 'rxjs/operators';
import { ApiService } from 'src/modules/api/api.service';
import { ArticleSelectors } from 'src/modules/article/+state/article.selectors';
import { AuthSelectors } from 'src/modules/auth/+state/auth.selectors';

import * as ArticleActions from './article.actions';

@Injectable()
export class ArticleEffects {
  constructor(
    private actions$: Actions,
    private apiService: ApiService,
    private store: Store,
    private router: Router
  ) {}

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

  removeArticle$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(ArticleActions.removeArticle),
        switchMap((action) => this.apiService.removeArticle(action.slug)),
        tap(() => {
          this.router.navigateByUrl('/');
        })
      ),
    { dispatch: false }
  );

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

  postComment$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ArticleActions.postComment),
      mergeMap((action) =>
        this.apiService
          .postComment(action.slug, action.body)
          .pipe(
            map((result) =>
              ArticleActions.postCommentSuccess({ comment: result.comment })
            )
          )
      )
    )
  );

  removeComment$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ArticleActions.removeComment),
      mergeMap((action) =>
        this.apiService
          .removeComment(action.slug, action.id)
          .pipe(
            map(() => ArticleActions.removeCommentSuccess({ id: action.id }))
          )
      )
    )
  );

  toggleFollowUser$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ArticleActions.toggleFollowUser),
      concatLatestFrom(() => this.store.select(ArticleSelectors.getArticle)),
      exhaustMap(([action, article]) => {
        return article?.author.following
          ? this.apiService.unfollowUser(action.username)
          : this.apiService.followUser(action.username);
      }),
      map((result) => ArticleActions.toggleFollowUserSuccess(result))
    )
  );
}
