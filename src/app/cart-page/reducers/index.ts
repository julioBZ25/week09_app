import {
  ActionReducer,
  ActionReducerMap,
  createFeatureSelector,
  createReducer,
  createSelector,
  MetaReducer,
  on,
} from '@ngrx/store';
import { CartData, ProductData } from 'src/app/common/models/cart.interfaces';
import { Datum } from 'src/app/common/models/products.interfaces';
import { CartActions } from '../actions/cart-action';

export const cartFeatureKey = 'cart';

export interface CartState {
  cart: Datum[];
}

export const initialCartState: CartState = {
  cart: [],
};

export const cartReducer = createReducer(
  initialCartState,
  on(CartActions.addProductToCart, (state, action) => {
    return {
      cart: [...state.cart, action.product],
    };
  })
);
