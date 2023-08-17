import { Injectable } from '@angular/core';
import { Action, Selector, State, StateContext } from '@ngxs/store';
import { AuthModel } from './auth.state.model';
import { AuthService } from 'src/app/services/auth/auth.service';
import { Auth } from './auth.action';
import { ISideNav } from './auth.interface';
import { LocalStorageState } from 'src/app/local-storage.state';
import { tap } from 'rxjs';

@State<AuthModel>({
  name: 'auth',
  defaults: new AuthModel(),
})
@Injectable()
export class AuthState {
  @Selector()
  static sideNav(): ISideNav[] {
    return [
      {
        name: 'Agency Member List',
        icon: 'person',
        route: '/dashboard',
        routeLinkActive: 'active',
      },
      {
        name: 'Add Employee',
        icon: 'commute',
        route: '/employee',
        routeLinkActive: 'active',
      },
      {
        name: 'Launch Appraisal',
        icon: 'commute',
        route: '/launch-appraisal',
        routeLinkActive: 'active',
      },
      {
        name: 'Self Annual Appraisal',
        icon: 'commute',
        route: '/self-appraisal',
        routeLinkActive: 'active',
      },
      {
        name: 'Annual Appraisal',
        icon: 'commute',
        route: '/annual-appraisal',
        routeLinkActive: 'active',
      },
      {
        name: 'All Employee List',
        icon: 'commute',
        route: '/all-employee',
        routeLinkActive: 'active',
      },
      {
        name: 'Appraisal Results',
        icon: 'commute',
        route: '/employee',
        routeLinkActive: 'active',
      },
      {
        name: 'Calibration',
        icon: 'settings',
        route: '/dashboard',
        routeLinkActive: 'active',
      },
      {
        name: 'Bell Cruve',
        icon: 'home',
        route: '/bell-curve',
        routeLinkActive: 'active',
      },
    ];
  }

  constructor(private authService: AuthService) {}

  @Action(Auth.Login)
  login(ctx: StateContext<AuthModel>, action: Auth.Login) {
    const state = ctx.getState();
    return this.authService.login(action.payload).pipe(
      tap((resp: any) => {
        console.log("auth responce > ", resp);
        LocalStorageState.setTokan(resp);
        LocalStorageState.setCurrentUser(resp);
      })
    );
  }
}
