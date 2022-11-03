import {
  ActionReducer,
  ActionReducerMap,
  createFeatureSelector,
  createReducer,
  createSelector,
  MetaReducer,
  on,
} from '@ngrx/store';
import { CategoriesResponse } from 'src/app/common/models/categories.interfaces';
import {
  Datum,
  ProductsResponse,
} from 'src/app/common/models/products.interfaces';
import { ProductsActions } from '../actions/product-action';

export const productsFeatureKey = 'products';

export interface ProductsState {
  products: ProductsResponse;
}

export const initialProductsState: ProductsState = {
  products: {
    data: [],
    meta: {
      current_page: 0,
      from: null,
      last_page: 0,
      per_page: 0,
      to: 0,
      total: 0,
    },
  },
};

export const productsReducer = createReducer(
  initialProductsState,
  on(ProductsActions.ProductsLoaded, (state, action) => {
    return {
      products: action.products,
    };
  }),
  on(ProductsActions.giveLikeProduct, (state, action) => {
    const newData = (state.products.data as Datum[]).map((product) =>
      product.id === action.product.id ? action.product : product
    );
    return {
      products: {
        data: newData,
        meta: { ...state.products.meta },
      },
    };
  }),
  on(ProductsActions.removeProducts, (state, action) => {
    return initialProductsState;
  }),
  on(ProductsActions.changeProducts, (state, action) => {
    return {
      products: action.products,
    };
  })
);
