import { createAction, props } from '@ngrx/store';
import { CategoriesResponse } from 'src/app/common/models/categories.interfaces';
import {
  Datum,
  ProductsResponse,
} from 'src/app/common/models/products.interfaces';

export const ProductsLoaded = createAction(
  '[Load Products Effect] Products Loaded',
  props<{ products: ProductsResponse }>()
);

export const loadProducts = createAction('[Products Resolver] Load Products');

export const giveLikeProduct = createAction(
  '[Like Product] Give Like',
  props<{
    product: Datum;
  }>()
);

export const removeProducts = createAction('[Home page] Products remove');

export const changeProducts = createAction(
  '[Home Page] Change Page',
  props<{ products: ProductsResponse }>()
);
