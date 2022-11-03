import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  CanLoad,
  Route,
  Router,
  RouterStateSnapshot,
  UrlSegment,
  UrlTree,
} from '@angular/router';
import { Observable } from 'rxjs';
import { JwtHelperService } from '@auth0/angular-jwt';
import { TokenService } from '../services/token.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanLoad {
  constructor(
    private tokenHelper: JwtHelperService,
    private token: TokenService,
    private router: Router
  ) {}

  canLoad(): boolean {
    const token = this.token.getToken();
    if (token && !this.tokenHelper.isTokenExpired(token)) {
      return true;
    }
    this.router.navigateByUrl('/login');
    return false;
  }
}
