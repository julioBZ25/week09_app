import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CartPageRoutingModule } from './cart-page-routing.module';
import { StoreModule } from '@ngrx/store';
import * as fromCart from './reducers';
import { NavbarModule } from '../navbar/navbar.module';
import { CartPageComponent } from './cart-page.component';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@NgModule({
  declarations: [CartPageComponent],
  imports: [
    CommonModule,
    CartPageRoutingModule,
    NavbarModule,
    MatCardModule,
    MatDividerModule,
    MatButtonModule,
    MatIconModule,
    StoreModule.forFeature(fromCart.cartFeatureKey, fromCart.cartReducer),
  ],
})
export class CartPageModule {}
