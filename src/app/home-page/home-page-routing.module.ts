import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CategoryService } from '../common/services/category.service';
import { HomePageComponent } from './home-page.component';
import { CategoryResolver } from './resolver/category.resolver';
import { ProductsResolver } from './resolver/products.resolver';

const routes: Routes = [
  {
    path: '',
    component: HomePageComponent,
    resolve: {
      products: ProductsResolver,
      categories: CategoryResolver,
    },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HomePageRoutingModule {}
