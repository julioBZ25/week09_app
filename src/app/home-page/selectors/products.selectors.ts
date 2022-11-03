import { createFeatureSelector, createSelector } from '@ngrx/store';
import { ProductsState } from '../reducers';

export const selectProductsState =
  createFeatureSelector<ProductsState>('products');

export const productsData = createSelector(
  selectProductsState,
  (products) => products.products
);
