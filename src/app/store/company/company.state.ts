import { Injectable } from '@angular/core';
import { Action, State, StateContext } from '@ngxs/store';
import { AuthService } from 'src/app/services/auth/auth.service';
import { CompanyModel } from './company.model';
import { Company } from './company.action';

@State<CompanyModel>({
  name: 'auth',
  defaults: new CompanyModel(),
})
@Injectable()
export class CompanyState {

  constructor(private authService: AuthService) {}

  @Action(Company.GetAll)
  getAll(ctx: StateContext<CompanyModel>, action: Company.GetAll) {
    const state = ctx.getState();
    return this.authService.login(action.payload)
    .pipe((resp: any) => {
      ctx.patchState({

      });
    });
  }

  @Action(Company.Create)
  create(ctx: StateContext<CompanyModel>, action: Company.Create) {
    const state = ctx.getState();
    return this.authService.login(action.payload)
    .pipe((resp: any) => {
      ctx.patchState({

      });
    });
  }

  
}

