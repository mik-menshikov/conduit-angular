import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { map, exhaustMap, catchError, mergeMap } from 'rxjs/operators';
import { ApiService } from 'src/modules/api/api.service';
import { getUserSuccess } from 'src/modules/auth/+state/auth.actions';
import * as UserActions from './settings.actions';

@Injectable()
export class SettingsEffects {
  constructor(private actions$: Actions, private apiService: ApiService) {}

  updateUser$ = createEffect(() =>
    this.actions$.pipe(
      ofType(UserActions.updateUser),
      exhaustMap((action) =>
        this.apiService.updateUser(action.user).pipe(
          mergeMap((result) => [
            getUserSuccess(result),
            UserActions.updateUserSuccess(),
          ]),
          catchError((err) =>
            of(UserActions.updateUserFailure({ error: err.error.errors }))
          )
        )
      )
    )
  );
}
