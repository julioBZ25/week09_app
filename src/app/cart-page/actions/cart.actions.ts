import { createAction, props } from '@ngrx/store';
import { CartData, ProductData } from 'src/app/common/models/cart.interfaces';
import { Datum } from 'src/app/common/models/products.interfaces';

export const addProductToCart = createAction(
  '[Add Product to Cart] Add Product to Cart',
  props<{ product: Datum }>()
);
