import { NgModule } from '@angular/core';
import { AdminRoutingModule } from './admin-routing.module';

import { ChartsModule } from 'ng2-charts';
import { SharedModule } from '../shared/shared.module';
import { ContentComponent } from './content/content.component'
import { FooterComponent } from './footer/footer.component';
import { HeaderComponent } from './header/header.component';
import { SideBarComponent } from './side-bar/side-bar.component';
import { DishboardComponent } from './dishboard/dishboard.component';
import { BellCurveComponent } from './bell-curve/bell-curve.component';
import { AdminLayoutComponent } from './admin-layout/admin-layout.component';
import { AddEmployeeComponent } from './add-employee/add-employee.component';
import { AddEditAgencyComponent } from './add-edit-agency/add-edit-agency.component';
import { SelfAnnualAppraisalComponent } from './self-annual-appraisal/self-annual-appraisal.component';

@NgModule({
  declarations: [
    HeaderComponent,
    SideBarComponent,
    ContentComponent,
    FooterComponent,
    AdminLayoutComponent,
    DishboardComponent,
    SelfAnnualAppraisalComponent,
    AddEmployeeComponent,
    BellCurveComponent,
    AddEditAgencyComponent,
  ],
  imports: [
    SharedModule,
    AdminRoutingModule,
    ChartsModule,
  ],
})
export class AdminModule {}
