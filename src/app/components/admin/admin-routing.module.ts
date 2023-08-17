import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DishboardComponent } from './dishboard/dishboard.component';
import { BellCurveComponent } from './bell-curve/bell-curve.component';
import { AnnualApprsaialComponent } from './annual-apprsaial/annual-apprsaial.component';
import { LaunchAppriasalComponent } from './launch-appriasal/launch-appriasal.component';
import { UnlaunchedAppriasalEmployeeComponent } from './unlaunched-appriasal-employee/unlaunched-appriasal-employee.component';
import { ComposeEmailComponent } from './compose-email/compose-email.component';
import { AssignMembersComponent } from './assign-members/assign-members.component';
import { AdminLayoutComponent } from './admin-layout/admin-layout.component';
import { AddEmployeeComponent } from './add-employee/add-employee.component';
import { AddEditAgencyComponent } from './add-edit-agency/add-edit-agency.component';
import { SelfAnnualAppraisalComponent } from './self-annual-appraisal/self-annual-appraisal.component';


const routes: Routes = [
    {
        path: "",
        component: AdminLayoutComponent,
        children: [
          {
            path: "",
            redirectTo: "/dashboard",
            pathMatch: "full",
          },
          {
            path: "dashboard",
            component: DishboardComponent,
          },
          {
            path: "employee",
            component: DishboardComponent,
          },
          {
            path: "add-agency",
            component: AddEditAgencyComponent,
          },
          {
            path: "launch-appraisal",
            component: LaunchAppriasalComponent,
          },
          {
            path: "self-appraisal",
            component: SelfAnnualAppraisalComponent,
          },
          {
            path: "annual-appraisal",
            component: AnnualApprsaialComponent,
          },
          {
            path: "all-employee",
            component: UnlaunchedAppriasalEmployeeComponent,
          },
          {
            path: "compose-email",
            component: ComposeEmailComponent,
          },
          {
            path: "assign-members",
            component: AssignMembersComponent,
          },
          {
            path: "employee",
            component: AddEmployeeComponent,
          },
          {
            path: "bell-curve",
            component: BellCurveComponent,
          },
        ],
    }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }