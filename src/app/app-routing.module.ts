import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './common/guards/auth.guard';
import { LoginGuard } from './common/guards/login.guard';
import { ProductsResolver } from './home-page/resolver/products.resolver';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: '/login',
    pathMatch: 'full',
  },
  {
    path: 'login',
    loadChildren: () =>
      import('./login-page/login-page.module').then((m) => m.LoginPageModule),
    canActivate: [LoginGuard],
  },
  {
    path: 'home',
    loadChildren: () =>
      import('./home-page/home-page.module').then((m) => m.HomePageModule),
    canLoad: [AuthGuard],
  },
  {
    path: 'cart',
    loadChildren: () =>
      import('./cart-page/cart-page.module').then((m) => m.CartPageModule),
    canLoad: [AuthGuard],
  },
  {
    path: 'product/:slug',
    loadChildren: () =>
      import('./product-page/product-page.module').then(
        (m) => m.ProductPageModule
      ),
    canLoad: [AuthGuard],
  },
  {
    path: '**',
    component: PageNotFoundComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
