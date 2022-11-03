import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomePageRoutingModule } from './home-page-routing.module';
import { StoreModule } from '@ngrx/store';
import * as fromProducts from './reducers';
import { EffectsModule } from '@ngrx/effects';
import { ProductsEffects } from './effects/products.effects';
import { ProductsResolver } from './resolver/products.resolver';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { MatButtonModule } from '@angular/material/button';
import { MatPaginatorModule } from '@angular/material/paginator';
import { HomePageComponent } from './home-page.component';
import { NavbarModule } from '../navbar/navbar.module';
import { MatSelectModule } from '@angular/material/select';
import { CategoryResolver } from './resolver/category.resolver';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [HomePageComponent],
  imports: [
    CommonModule,
    HomePageRoutingModule,
    NavbarModule,
    MatCardModule,
    MatInputModule,
    MatDividerModule,
    MatButtonModule,
    MatFormFieldModule,
    MatPaginatorModule,
    MatSelectModule,
    FormsModule,
    StoreModule.forFeature(
      fromProducts.productsFeatureKey,
      fromProducts.productsReducer
    ),
    EffectsModule.forFeature([ProductsEffects]),
  ],
  providers: [ProductsResolver, CategoryResolver],
})
export class HomePageModule {}
