import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { concatMap, map, switchMap, tap } from 'rxjs';
import { CategoryService } from 'src/app/common/services/category.service';
import { LikeService } from 'src/app/common/services/like.service';
import { ProductsService } from 'src/app/common/services/products.service';
import { ProductsActions } from '../actions/product-action';
import { ProductsLoaded } from '../actions/products.actions';

@Injectable()
export class ProductsEffects {
  loadProducts$ = createEffect(() =>
    this.action$.pipe(
      ofType(ProductsActions.loadProducts),
      concatMap((action) => this.productsService.getProducts()),
      map((products) => ProductsLoaded({ products }))
    )
  );

  constructor(
    private action$: Actions,
    private productsService: ProductsService
  ) {}
}
