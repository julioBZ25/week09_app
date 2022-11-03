import {
  ActionReducer,
  ActionReducerMap,
  createFeatureSelector,
  createSelector,
  MetaReducer,
} from '@ngrx/store';
import { environment } from '../../environments/environment';
import { routerReducer } from '@ngrx/router-store';
import { RouterState } from '@angular/router';
import { cartReducer, CartState } from '../cart-page/reducers';

export interface AppState {
  router: RouterState;
  cart: CartState;
}

export const reducers: ActionReducerMap<AppState> = {
  router: routerReducer,
  cart: cartReducer,
};

export const metaReducers: MetaReducer<AppState>[] = !environment.production
  ? []
  : [];
