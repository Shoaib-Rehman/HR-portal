import { Injectable } from '@angular/core';
import { Action, Selector, State, StateContext } from '@ngxs/store';
import { CompanyModel } from './company.model';
import { Company } from './company.action';
import { CompanyService } from 'src/app/services/company/company.service';
import { tap, map } from 'rxjs';
import { IMember } from 'src/app/interface';

@State<CompanyModel>({
  name: 'company',
  defaults: new CompanyModel(),
})
@Injectable()
export class CompanyState {
  constructor(private companyService: CompanyService) {}

  @Selector()
  static agenciesInfo(state: CompanyModel) {
    return state.agenciesList;
  }
  
  @Selector()
  static GetAllMemberWhoDoneApprisal(state: CompanyModel) {
    return state.AllMemberWhoDoneApprisal;
  }


  @Selector()
  static agencyEmployees(state: CompanyModel) {
    return state.agencyemployeeList;
  }

  @Selector()
  static allEmployees(state: CompanyModel) {
    return state.allemployeeList;
  }

  @Selector()
  static userdetails(state: CompanyModel) {
    return state.userId;
  }
  @Selector()
  static assignMember(state: CompanyModel) {
    return state.managerEmployeeList;
  }

  @Action(Company.GetAll)
  getAllAgencies(ctx: StateContext<CompanyModel>) {
    const state = ctx.getState();
    if (state.agenciesList.length) {
      return state.agenciesList;
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
  addEmployee(ctx: StateContext<CompanyModel>, action: Company.addEmployee) {
    return this.companyService.addEmployee(action.payload).pipe(
      tap((resp) => {
        ctx.patchState({});
      })
    );
  }

  @Action(Company.EditEmployee)
  EditEmployee(ctx: StateContext<CompanyModel>, action: Company.EditEmployee) {
    return this.companyService.editEmployee(action.payload).pipe(
      tap((resp) => {
        ctx.patchState({});
      })
    );
  }

  @Action(Company.GetAllEmployee)
  GetAllEmployee(ctx: StateContext<CompanyModel>) {
    return this.companyService.getAllEmployee().pipe(
      tap((resp) => {
        ctx.patchState({
          allemployeeList: resp,
        });
      })
    );
    // }
  }

  @Action(Company.GetSingleAgencyEmployee)
  GetAgencyEmployee(
    ctx: StateContext<CompanyModel>,
    action: Company.GetSingleAgencyEmployee
  ) {
    return this.companyService.agencyEmployee(action.payload).pipe(
      tap((resp) => {
        resp.map((res:IMember) => {
          if (res.role === 'TeamLead') {
            res.role = 'Team Lead';
          }
        });
        ctx.patchState({
          agencyemployeeList: resp,
        });
      })
    );
  }

  @Action(Company.getMembers)
  getMembers(ctx: StateContext<CompanyModel>, action: Company.getMembers) {
    return this.companyService.getMembers(action.payload).pipe(
      tap((resp) => {
        ctx.patchState({
          managerEmployeeList: resp,
        });
      })
    );
  }

  @Action(Company.AssignMembers)
  AssignMembers(
    ctx: StateContext<CompanyModel>,
    action: Company.AssignMembers
  ) {
    return this.companyService.assignMembers(action.payload);
  }

  @Action(Company.launchAppriasal)
  launchAppriasal(
    ctx: StateContext<CompanyModel>,
    action: Company.launchAppriasal
  ) {
    return this.companyService.launchAppriasal(action.payload).pipe(
      tap((resp) => {
        ctx.patchState({
          agencyemployeeList: resp,
        });
      })
    );
  }

  @Action(Company.launchSelfApriasal)
  launchSelfApriasal(
    ctx: StateContext<CompanyModel>,
    action: Company.launchSelfApriasal
  ) {
    return this.companyService
      .launchSelfApriasal(action.payload)
      .pipe(tap((resp) => {}));
  }

  @Action(Company.GetSelfApriasal)
  GetSelfApriasal(
    ctx: StateContext<CompanyModel>,
    action: Company.GetSelfApriasal
  ) {
    return this.companyService.getSelfApriasal(action.payload).pipe(
      tap((resp) => {
        ctx.patchState({
          ApprisalDetails: resp,
        });
      })
    );
  }

  @Action(Company.launchCompetencyApriasal)
  launchCompetencyApriasal(
    ctx: StateContext<CompanyModel>,
    action: Company.launchCompetencyApriasal
  ) {
    return this.companyService
      .launchCompetencyApriasal(action.payload)
      .pipe(tap((resp) => {}));
  }

  @Action(Company.GetCompetencyApriasal)
  GetCompetencyApriasal(
    ctx: StateContext<CompanyModel>,
    action: Company.GetSelfApriasal
  ) {
    return this.companyService.GetCompetencyApriasal(action.payload).pipe(
      tap((resp) => {
        ctx.patchState({
          ApprisalDetails: resp,
        });
      })
    );
  }

  @Action(Company.launchNextYearApriasal)
  launchNextYearApriasal(
    ctx: StateContext<CompanyModel>,
    action: Company.launchNextYearApriasal
  ) {
    return this.companyService
      .launchNextYearApriasal(action.payload)
      .pipe(tap((resp) => {}));
  }

  @Action(Company.GetNextYearApriasal)
  GetNextYearApriasal(
    ctx: StateContext<CompanyModel>,
    action: Company.GetNextYearApriasal
  ) {
    return this.companyService.GetNextYearApriasal(action.payload).pipe(
      tap((resp) => {
        ctx.patchState({
          ApprisalDetails: resp,
        });
      })
    );
  }


  @Action(Company.DownloadPDF)
  DownloadPDF(
    ctx: StateContext<CompanyModel>,
    action: Company.DownloadPDF
  ) {
    return this.companyService.downloadPDF(action.payload)
  }


  @Action(Company.GetAllMemberWhoDoneApprisal)
  GetAllMemberWhoDoneApprisal(ctx: StateContext<CompanyModel>, action: Company.GetAllMemberWhoDoneApprisal) {
    return this.companyService.getAllEmployeeWhoDoneApprisal(action.payload).pipe(
      tap((resp) => {
        ctx.patchState({
          AllMemberWhoDoneApprisal: resp,
        });
      })
    );
  }

  // @Action(Company.GetUserIdLocalStorage)
  // GetUserIdLocalStorage(ctx:StateContext<CompanyModel>) {
  //   return ctx.getState()
  // }
}
