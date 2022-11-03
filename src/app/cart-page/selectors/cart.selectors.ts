import { createFeatureSelector, createSelector } from '@ngrx/store';
import { CartState } from '../reducers';

export const selectCartState = createFeatureSelector<CartState>('cart');

export const cartData = createSelector(selectCartState, (data) => data.cart);
