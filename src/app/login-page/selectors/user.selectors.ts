import { createFeatureSelector, createSelector } from '@ngrx/store';
import { UserResponse } from 'src/app/common/models/auth.interfaces';
import { UserState } from '../reducers';

export const selectUserState = createFeatureSelector<UserState>('user');

export const userData = createSelector(
  selectUserState,
  (user) => user.user as UserResponse
);
