import { Injectable } from '@angular/core';
import { Action, Selector, State, StateContext } from '@ngxs/store';
import { AuthModel } from './auth.model';
import { AuthService } from 'src/app/services/auth/auth.service';
import { Auth } from './auth.action';
import { ISideNav } from './auth.interface';

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
        name: 'Add Agency',
        icon: 'person',
        route: '/dashboard',
        routeLinkActive: "active"
      },
      {
        name: 'Add Employee',
        icon: 'commute',
        route: '/employee',
        routeLinkActive: "active"
      },
      {
        name: 'Launch Appraisal',
        icon: 'commute',
        route: '/dashboard',
        routeLinkActive: "active"
      },
      {
        name: 'Appraisal Results',
        icon: 'commute',
        route: '/employee',
        routeLinkActive: "active"
      },
      {
        name: 'Calibration',
        icon: 'settings',
        route: '/dashboard',
        routeLinkActive: "active"
      },
      {
        name: 'Bell Cruve',
        icon: 'home',
        route: '/employee',
        routeLinkActive: "active"
      },
    ];
  }

  constructor(private authService: AuthService) {}

  @Action(Auth.Login)
  login(ctx: StateContext<AuthModel>, action: Auth.Login) {
    const state = ctx.getState();
    return this.authService.login(action.payload).pipe((resp: any) => {
      ctx.patchState({});
    });
  }
}
