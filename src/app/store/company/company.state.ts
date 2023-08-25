import { Injectable } from '@angular/core';
import { Action, Selector, State, StateContext } from '@ngxs/store';
import { CompanyModel } from './company.model';
import { Company } from './company.action';
import { CompanyService } from 'src/app/services/company/company.service';
import { tap } from 'rxjs';

@State<CompanyModel>({
  name: 'company',
  defaults: new CompanyModel(),
})
@Injectable()
export class CompanyState {
  
  constructor(private companyService: CompanyService) {}


  @Selector()
	static agenciesInfo(state: CompanyModel) { return state.agenciesList }

  @Selector()
	static agencyEmployees(state: CompanyModel) { return state.agencyemployeeList }

  @Selector()
	static allEmployees(state: CompanyModel) { return state.allemployeeList }


  @Action(Company.GetAll)
  getAllAgencies(ctx: StateContext<CompanyModel>) {
    const state = ctx.getState();
    if(state.agenciesList.length) {
      return state.agenciesList
    } else {
      return this.companyService.getAllAgencies().pipe(
        tap((resp) => {
          ctx.patchState({
            agenciesList: resp?.items,
          });
        })
      );
    }
  }

  @Action(Company.addEmployee) 
  addEmployee(ctx:StateContext<CompanyModel>, action:Company.addEmployee) {
    return this.companyService.addEmployee(action.payload).pipe(
      tap((resp) => {
        console.log('addEmssssssssssployee>>>>>>>', resp);
        ctx.patchState({

        });
      })
    );
  }


  @Action(Company.EditEmployee) 
  EditEmployee(ctx:StateContext<CompanyModel>, action:Company.EditEmployee) {
    return this.companyService.editEmployee(action.payload).pipe(
      tap((resp) => {
        console.log('addEmssssssssssployee>>>>>>>', resp);
        ctx.patchState({

        });
      })
    );
  }



  @Action(Company.GetAllEmployee) 
  GetAllEmployee(ctx:StateContext<CompanyModel>) {
    // const state = ctx.getState();
    // if(state.allemployeeList.length) {
    //   return state.allemployeeList
    // } else {
      
    return this.companyService.getAllEmployee().pipe(
      tap((resp) => {
        ctx.patchState({
          allemployeeList : resp
        });
      })
    );
    // }
  }

  @Action(Company.GetSingleAgencyEmployee) 
  GetAgencyEmployee(ctx:StateContext<CompanyModel>, action:Company.GetSingleAgencyEmployee) {
    // const state = ctx.getState();
    // if(state.agencyemployeeList.length) {
    //   return state.agencyemployeeList;
    // } 
    return this.companyService.agencyEmployee(action.payload).pipe(
      tap((resp) => {
        console.log('agencyEmployeeList>>>>>>>', resp);
        ctx.patchState({
          agencyemployeeList: resp
        });
      })
    );
  }

  @Action(Company.launchAppriasal) 
  launchAppriasal(ctx:StateContext<CompanyModel>, action:Company.launchAppriasal) {
    // const state = ctx.getState();
    // if(state.agencyemployeeList.length) {
    //   return state.agencyemployeeList;
    // } 
    return this.companyService.launchAppriasal(action.payload).pipe(
      tap((resp) => {
        console.log('agencyEmployeeList>>>>>>>', resp);
        ctx.patchState({
          agencyemployeeList: resp
        });
      })
    );
  }

  @Action(Company.lanunchSelfApriasal) 
  lanunchSelfApriasal(ctx:StateContext<CompanyModel>, action:Company.lanunchSelfApriasal) {
    return this.companyService.lanunchSelfApriasal(action.payload).pipe(
      tap((resp) => {
        console.log('resp', resp)
        // ctx.patchState({
        //   agencyemployeeList: resp
        // });
      })
    );
  }
}






