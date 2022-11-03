import {
  ActionReducer,
  ActionReducerMap,
  createFeatureSelector,
  createReducer,
  createSelector,
  MetaReducer,
  on,
} from '@ngrx/store';
import {
  LoginResponse,
  UserResponse,
} from 'src/app/common/models/auth.interfaces';
import { LoginActions } from '../actions/loginActions';

export const userFeatureKey = 'user';

export interface UserState {
  user?: UserResponse;
}

export const initialUserState: UserState = {
  user: undefined,
};

export const loginReducer = createReducer(
  initialUserState,
  on(LoginActions.login, (state, action) => {
    return {
      user: action.user.data.user,
    };
  }),

  on(LoginActions.logout, (state, action) => {
    return {
      user: undefined,
    };
  })
);
