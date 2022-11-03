import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { UserResponse } from '../common/models/auth.interfaces';
import { CartRequest } from '../common/models/cart.interfaces';
import { Storage } from '../common/services/localstorage.service';
import { logout } from '../login-page/actions/login.actions';
import { UserState } from '../login-page/reducers';
import { userData } from '../login-page/selectors/user.selectors';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent implements OnInit {
  @Input('cart') cart!: CartRequest[];
  @Output() userEvent = new EventEmitter<UserResponse>();
  user!: UserResponse;
  constructor(
    private store: Store<UserState>,
    private router: Router,
    private LocalStorageService: Storage
  ) {}

  ngOnInit(): void {
    this.store.select(userData).subscribe({
      next: (res) => {
        this.user = res;
        this.userEvent.emit(this.user);
      },
      error: (err) => {
        this.user = JSON.parse(localStorage.getItem('user') as string);
        this.userEvent.emit(this.user);
      },
    });
  }

  toCartPage() {
    this.router.navigateByUrl('/cart');
  }

  logout() {
    this.store.dispatch(logout());
    this.router.navigateByUrl('/login');
  }

  toHomePage() {
    if (this.router.url.includes('cart')) {
      this.LocalStorageService.saveData('cart', JSON.stringify(this.cart));
    }
    this.router.navigateByUrl('/home');
  }
}
