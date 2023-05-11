import { Injectable } from '@angular/core';
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  UrlTree,
  Router,
} from '@angular/router';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';
import { UserAuthService } from '../services/user-auth.service';
import { loginResponse } from '../state/auth.selector';
@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(
    private userAuthService: UserAuthService,
    private router: Router,
    private userService: AuthService,
    private store: Store
  ) {}

  canActivate(
    route: ActivatedRouteSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    if (this.userAuthService.getToken() !== null) {
      const role = route.data['roles'] as Array<string>;
      if (role) {
        const match = this.userService.roulesMatch(role);

        if (match) {
          return true;
        } else {
          this.router.navigate(['/error/403']);
          return false;
        }
      }
    }
    this.router.navigate(['/auth/login']);
    return false;
  }
}
