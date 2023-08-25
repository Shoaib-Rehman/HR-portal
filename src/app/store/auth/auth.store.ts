import { Injectable } from '@angular/core';
import { Action, Selector, State, StateContext } from '@ngxs/store';
import { AuthModel } from './auth.state.model';
import { AuthService } from 'src/app/services/auth/auth.service';
import { Auth } from './auth.action';
import { ISideNav } from './auth.interface';
import { LocalStorageState } from 'src/app/local-storage.state';
import { tap } from 'rxjs';
import { ISideBar } from 'src/app/interface';
import { SideBarData } from 'src/app/helper/sidebar-data';
import { Permission } from 'src/app/helper/permission';

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

  constructor(private authService: AuthService) {}



  @Action(Auth.Login)
  login(ctx: StateContext<AuthModel>, action: Auth.Login) {
    return this.authService.login(action.payload).pipe(
      tap((resp: any) => {
        console.log("auth responce > ", resp);
        LocalStorageState.setTokan(resp?.token);
        LocalStorageState.setCurrentUser(resp?.user);
        ctx.patchState({
          sideBar: this.sideBarModules,
        });
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
    return SideBarData.data.filter((module: ISideBar) => Permission.canSee(module.name));
  }



}
