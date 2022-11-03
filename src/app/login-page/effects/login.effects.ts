import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { tap } from 'rxjs';
import { Storage } from 'src/app/common/services/localstorage.service';
import { LoginActions } from '../actions/loginActions';

@Injectable()
export class LoginEffects {
  login$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(LoginActions.login),
        tap((action) => {
          this.localStorageService.saveData('token', action.user.data.token);
          this.localStorageService.saveData(
            'user',
            JSON.stringify(action.user.data.user)
          );
        })
      ),
    { dispatch: false }
  );

  logout$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(LoginActions.logout),
        tap((action) => {
          this.localStorageService.removeData('token');
          this.localStorageService.removeData('user');
          this.localStorageService.removeData('cart');
        })
      ),
    { dispatch: false }
  );

  constructor(
    private actions$: Actions,
    private localStorageService: Storage
  ) {}
}
