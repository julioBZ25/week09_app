import { createAction, props } from '@ngrx/store';
import { LoginResponse } from 'src/app/common/models/auth.interfaces';

export const login = createAction(
  '[Login Page] User Login,',
  props<{ user: LoginResponse }>()
);

export const logout = createAction('[Home Page] User Logout');
