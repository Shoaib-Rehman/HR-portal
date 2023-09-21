import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { Select, Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { LocalStorageService } from 'src/app/services/local-storage/local-storage.service';
import { Auth } from 'src/app/store/auth/auth.action';
import { ISideNav } from 'src/app/store/auth/auth.interface';
import { AuthState } from 'src/app/store/auth/auth.store';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  @Select(AuthState.sideNav) sideNav$: Observable<ISideNav[]> | undefined;

  constructor(
    private router: Router,
    private localStorage: LocalStorageService,
    private store: Store
  ) {
    this.store.dispatch(new Auth.RefreshSideBarORData());
  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    if (!this.localStorage.Tokan) {
      return this.router.parseUrl('/auth/login');
    }

    return new Observable((observer) => {
      this.sideNav$?.subscribe((sideBarItems: ISideNav[]) => {
        const routs: string[] = sideBarItems.map(
          (item: ISideNav) => item.route
        );

        const isFound: boolean = routs.includes(state.url);
        if (!isFound) {
          observer.next(this.router.parseUrl('/not-found'));
        } else {
          observer.next(isFound);
        }
      });
    });

    // return true;
  }
}
