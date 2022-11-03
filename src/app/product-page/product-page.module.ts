import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProductPageRoutingModule } from './product-page-routing.module';
import { ProductPageComponent } from './product-page.component';
import { NavbarModule } from '../navbar/navbar.module';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';

@NgModule({
  declarations: [ProductPageComponent],
  imports: [
    CommonModule,
    ProductPageRoutingModule,
    NavbarModule,
    MatButtonModule,
    MatCardModule,
  ],
})
export class ProductPageModule {}
