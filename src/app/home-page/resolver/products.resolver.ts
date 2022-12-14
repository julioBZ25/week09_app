import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  Resolve,
  RouterStateSnapshot,
} from '@angular/router';
import { Store } from '@ngrx/store';
import { finalize, first, Observable, tap } from 'rxjs';
import { AppState } from 'src/app/reducers';
import { loadProducts } from '../actions/products.actions';

@Injectable()
export class ProductsResolver implements Resolve<any> {
  loading = false;
  constructor(private store: Store<AppState>) {}
  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<any> {
    return this.store.pipe(
      tap(() => {
        if (!this.loading) {
          this.loading = true;
          this.store.dispatch(loadProducts());
        }
      }),
      first(),
      finalize(() => (this.loading = false))
    );
  }
}
