import { SelfAnnualAppraisalComponent } from './self-annual-appraisal/self-annual-appraisal.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminLayoutComponent } from './admin-layout/admin-layout.component';
import { DishboardComponent } from './dishboard/dishboard.component';
import { AddEmployeeComponent } from './add-employee/add-employee.component';
import { BellCurveComponent } from './bell-curve/bell-curve.component';
import { AnnualApprsaialComponent } from './annual-apprsaial/annual-apprsaial.component';
import { LaunchAppriasalComponent } from './launch-appriasal/launch-appriasal.component';
import { UnlaunchedAppriasalEmployeeComponent } from './unlaunched-appriasal-employee/unlaunched-appriasal-employee.component';
import { ComposeEmailComponent } from './compose-email/compose-email.component';
import { AssignMembersComponent } from './assign-members/assign-members.component';
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
          // {
          //   path: "employee",
          //   component: DishboardComponent,
          // },
          {
            path: "launchAppraisal",
            component: LaunchAppriasalComponent,
          },
          {
            path: "selfAppraisal",
            component: SelfAnnualAppraisalComponent,
          },
          {
            path: "annualappraisal",
            component: AnnualApprsaialComponent,
          },
          {
            path: "allemployee",
            component: UnlaunchedAppriasalEmployeeComponent,
          },
          {
            path: "composeEmail",
            component: ComposeEmailComponent,
          },
          {
            path: "assignMembers",
            component: AssignMembersComponent,
          },
          {
            path: "employee",
            component: AddEmployeeComponent,
          },
          {
            path: "bellCurve",
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