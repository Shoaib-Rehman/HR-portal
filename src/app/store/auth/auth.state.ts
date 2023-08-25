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
        name: 'Agency Member List',
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
        route: '/launchAppraisal',
        routeLinkActive: "active"
      },
    
      {
        name: 'All Employee List',
        icon: 'commute',
        route: '/allemployee',
        routeLinkActive: "active"
      },
      {
        name: 'Compose Email',
        icon: 'commute',
        route: '/composeEmail',
        routeLinkActive: "active"
      },
      {
        name: 'assign Members',
        icon: 'commute',
        route: 'assignMembers',
        routeLinkActive: "active"
      },
      {
        name: 'Self Annual Appraisal',
        icon: 'commute',
        route: '/selfAppraisal',
        routeLinkActive: "active"
      },
      {
        name: 'Annual Appraisal',
        icon: 'commute',
        route: '/annualappraisal',
        routeLinkActive: "active"
      },
      {
        name: 'Next Year Objectives',
        icon: 'commute',
        route: '/next-year-objective',
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
        route: '/bellCurve',
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
