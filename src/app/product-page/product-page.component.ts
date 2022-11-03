import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Route } from '@angular/router';
import { Store } from '@ngrx/store';
import { UserResponse } from '../common/models/auth.interfaces';
import { LikeData } from '../common/models/like.interfaces';
import { Datum } from '../common/models/products.interfaces';
import { LikeService } from '../common/services/like.service';
import { ProductsService } from '../common/services/products.service';
import { giveLikeProduct } from '../home-page/actions/products.actions';
import { ProductsState } from '../home-page/reducers';
import { productsData } from '../home-page/selectors/products.selectors';
import { AppState } from '../reducers';

@Component({
  selector: 'app-product-page',
  templateUrl: './product-page.component.html',
  styleUrls: ['./product-page.component.scss'],
})
export class ProductPageComponent implements OnInit {
  product!: Datum;
  user!: UserResponse;
  like!: LikeData[];
  constructor(
    private productsService: ProductsService,
    private route: ActivatedRoute,
    private likeService: LikeService,
    private store: Store<ProductsState>
  ) {}

  ngOnInit(): void {
    const param = this.route.snapshot.paramMap.get('slug') as string;
    console.log(param);

    this.store.select(productsData).subscribe({
      next: (res) => {
        console.log(res);

        this.product = res.data.find(
          (product) => product.slug === param
        ) as Datum;
      },
    });
    this.reloadLikes();
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

  handleLike(id: number, kind: string) {
    const updateProduct = {
      ...this.product,
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
  disableLike(product_id: number) {
    const like = this.like?.find((data) => data.product_id === product_id);
    return !!like?.kind;
  }
}
