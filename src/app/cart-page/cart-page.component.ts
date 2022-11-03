import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { CartData, CartRequest } from '../common/models/cart.interfaces';
import { Datum } from '../common/models/products.interfaces';
import { Storage } from '../common/services/localstorage.service';
import { AppState } from '../reducers';
import { cartData } from './selectors/cart.selectors';

@Component({
  selector: 'app-cart-page',
  templateUrl: './cart-page.component.html',
  styleUrls: ['./cart-page.component.scss'],
})
export class CartPageComponent implements OnInit {
  cartRequest!: CartRequest[];
  cart!: Datum[];
  updatedCart!: CartData[];

  constructor(
    private store: Store<AppState>,
    private router: Router,
    private localStorageService: Storage
  ) {}

  ngOnInit(): void {
    this.store.select(cartData).subscribe({
      next: (res) => (this.cart = res),
    });
    if (this.localStorageService.getData('cart')) {
      this.cartRequest = [
        ...JSON.parse(this.localStorageService.getData('cart') as string),
      ];
    } else {
      this.cartRequest = [
        ...this.cart.map((product) => {
          return {
            product_variant_id: product.id,
            quantity: 1,
          };
        }),
      ];
    }
  }

  handleQuantity(id: number, action: string) {
    const data = this.cartRequest.find(
      (product) => product.product_variant_id === id
    ) as CartRequest;
    if (action === 'add') {
      data.quantity += 1;
    } else if (action === 'remove') {
      if (data.quantity > 0) {
        data.quantity -= 1;
      }
    }
  }
  toProductPage(slug: string) {
    this.localStorageService.saveData('cart', JSON.stringify(this.cartRequest));
    this.router.navigate(['/product', slug]);
  }
}
