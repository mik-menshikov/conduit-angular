import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { switchMap, map, tap, catchError } from 'rxjs/operators';
import { ApiService } from 'src/modules/api/api.service';
import { TokenPersistenceService } from 'src/modules/auth/token-persistence.service';
import * as AuthActions from './auth.actions';

@Injectable()
export class AuthEffects {
  constructor(
    private actions$: Actions,
    private apiService: ApiService,
    private tokenService: TokenPersistenceService,
    private router: Router
  ) {}

  login$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.login),
      switchMap((action) =>
        this.apiService.login(action.data).pipe(
          map((results) => AuthActions.loginSuccess(results)),
          catchError((err) =>
            of(AuthActions.loginFailure({ error: err.error.errors }))
          )
        )
      )
    )
  );

  loginSuccess$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(AuthActions.loginSuccess),
        tap((action) => {
          this.tokenService.set(action.user.token);
          this.router.navigateByUrl('/');
        })
      ),
    { dispatch: false }
  );

  register$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.register),
      switchMap((action) =>
        this.apiService.register(action.user).pipe(
          map((results) => AuthActions.loginSuccess(results)),
          catchError((err) =>
            of(AuthActions.loginFailure({ error: err.error.errors }))
          )
        )
      )
    )
  );

  getUser$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.getUser),
      switchMap(() =>
        this.apiService
          .getUser()
          .pipe(map((results) => AuthActions.getUserSuccess(results)))
      )
    )
  );
}
