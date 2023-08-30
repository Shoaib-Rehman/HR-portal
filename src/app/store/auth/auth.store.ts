import { Injectable } from '@angular/core';
import { Action, Selector, State, StateContext } from '@ngxs/store';
import { AuthModel } from './auth.state.model';
import { AuthService } from 'src/app/services/auth/auth.service';
import { Auth } from './auth.action';
import { ISideNav } from './auth.interface';
import { tap } from 'rxjs';
import { ISideBar } from 'src/app/interface';
import { SideBarData } from 'src/app/helper/sidebar-data';
import { PermissionsService } from 'src/app/services/permissions/permissions.service';
import { LocalStorageService } from 'src/app/services/local-storage/local-storage.service';

@State<AuthModel>({
  name: 'auth',
  defaults: new AuthModel(),
})
@Injectable()
export class AuthState {
  @Selector()
  static sideNav(state: AuthModel): ISideNav[] {
    return state.sideBar;
  }

  constructor(
    private authService: AuthService,
    private permissions: PermissionsService,
    private localStorage: LocalStorageService
  ) {}

  @Action(Auth.Login)
  login(ctx: StateContext<AuthModel>, action: Auth.Login) {
    return this.authService.login(action.payload).pipe(
      tap((resp: any) => {
        this.localStorage.setTokan(resp?.token);
        this.localStorage.setCurrentUser(resp?.user);
        ctx.patchState({
          sideBar: this.sideBarModules,
        });
      })
    );
  }

  @Action(Auth.Logout)
  logout(ctx: StateContext<AuthModel>, action: Auth.Logout) {
    return this.authService.logout().pipe(
      tap((resp: any) => {
        this.localStorage.setTokan('');
        this.localStorage.setCurrentUser('');
      })
    );
  }

  @Action(Auth.RefreshSideBarORData)
  refreshSideBarORData(ctx: StateContext<AuthModel>) {
    ctx.patchState({
      sideBar: this.sideBarModules,
    });
  }

  get sideBarModules(): ISideBar[] {
    return SideBarData.data.filter((module: ISideBar) =>
      this.permissions.canSee(module.name)
    );
  }
}
