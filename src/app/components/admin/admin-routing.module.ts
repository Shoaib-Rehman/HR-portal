import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DishboardComponent } from './dishboard/dishboard.component';
import { BellCurveComponent } from './bell-curve/bell-curve.component';
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
            path: "appraisal",
            component: SelfAnnualAppraisalComponent,
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