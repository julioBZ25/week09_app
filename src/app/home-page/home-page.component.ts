import { Component, OnInit } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { MatSelectChange } from '@angular/material/select';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { addProductToCart } from '../cart-page/actions/cart.actions';
import { UserResponse } from '../common/models/auth.interfaces';
import { CategoriesResponse } from '../common/models/categories.interfaces';
import { LikeData } from '../common/models/like.interfaces';
import { Datum, Meta } from '../common/models/products.interfaces';
import { LikeService } from '../common/services/like.service';
import { ProductsService } from '../common/services/products.service';
import { logout } from '../login-page/actions/login.actions';
import { userData } from '../login-page/selectors/user.selectors';
import { changeProducts, giveLikeProduct } from './actions/products.actions';
import { ProductsState } from './reducers';
import { productsData } from './selectors/products.selectors';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss'],
})
export class HomePageComponent implements OnInit {
  user!: UserResponse;
  products!: Datum[];
  filterProducts!: Datum[];
  paginator!: Meta;
  like!: LikeData[];
  productsOptions: {
    category?: number;
    name?: string;
  } = {
    category: undefined,
    name: undefined,
  };

  categories!: CategoriesResponse;
  constructor(
    private productsService: ProductsService,
    private store: Store<ProductsState>,
    private router: Router,
    private likeService: LikeService,
    private actRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.store.select(productsData).subscribe({
      next: (res) => {
        this.products = res.data as Datum[];
        this.paginator = res.meta as Meta;
      },
    });
    this.reloadLikes();
    this.categories = this.actRoute.snapshot.data['categories'];
  }

  getUser(user: UserResponse) {
    this.user = user;
  }

  reloadLikes() {
    this.likeService.getLikes().subscribe({
      next: (res) => {
        this.like = [
          ...res.data.filter((like) => like.user_id === this.user.id),
        ];
      },
    });
  }

  handlePaginator(event: PageEvent) {
    const page = event.pageIndex + 1;
    this.productsService.getProducts(page).subscribe({
      next: (res) => {
        this.products = res.data as Datum[];
        this.store.dispatch(
          changeProducts({
            products: res,
          })
        );
      },
    });
  }

  handleLike(id: number, kind: string) {
    const updateProduct = {
      ...(this.products.find((product) => product.id === id) as Datum),
    };

    this.likeService.likeProduct(id, kind).subscribe({
      next: (res) => {
        if (kind === 'up') {
          updateProduct.likes_up_count += 1;
        } else if (kind === 'down') {
          updateProduct.likes_up_count -= 1;
        }
        this.store.dispatch(
          giveLikeProduct({
            product: updateProduct,
          })
        );
        this.reloadLikes();
      },
    });
  }

  handleFilterByName({ name }: { name: string }) {
    this.productsOptions.name = name;
    if (name !== '') {
      this.filterProducts = [...this.products];
      this.productsService
        .getProducts(
          1,
          this.productsOptions.category,
          this.productsOptions.name
        )
        .subscribe({
          next: (res) => {
            this.products = res.data as Datum[];
            this.paginator = res.meta as Meta;
          },
        });
    } else {
      this.products = [...this.filterProducts];
    }
  }

  handleFilterByCategory(event: MatSelectChange) {
    console.log(event.value);
    if (event.value === -1) {
      this.productsOptions.category = undefined;
    } else {
      this.productsOptions.category = event.value as number;
    }
    if (event.value === -1) {
      this.store.select(productsData).subscribe({
        next: (res) => {
          this.products = res.data as Datum[];
          this.paginator = res.meta as Meta;
        },
      });
    } else {
      this.productsService
        .getProducts(
          1,
          this.productsOptions.category,
          this.productsOptions.name
        )
        .subscribe({
          next: (res) => {
            this.products = res.data as Datum[];
            this.paginator = res.meta as Meta;
          },
        });
    }
  }

  addProductToCart(id: number) {
    const productData = this.products.find(
      (product) => product.id === id
    ) as Datum;
    this.store.dispatch(
      addProductToCart({
        product: productData,
      })
    );
  }

  disableLike(product_id: number) {
    const like = this.like?.find((data) => data.product_id === product_id);
    return !!like?.kind;
  }
}
