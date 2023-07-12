import { AdminRoutingModule } from './admin-routing.module';
import { NgModule } from '@angular/core';

import { AdminLayoutComponent } from './admin-layout/admin-layout.component';
import { DishboardComponent } from './dishboard/dishboard.component';
import { SideBarComponent } from './side-bar/side-bar.component';
import { ContentComponent } from './content/content.component'
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { SharedModule } from '../shared/shared.module';
import { SelfAnnualAppraisalComponent } from './self-annual-appraisal/self-annual-appraisal.component';
import { AddEmployeeComponent } from './add-employee/add-employee.component';

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
  ],
  imports: [
    SharedModule,
    AdminRoutingModule,
  ],
})
export class AdminModule {}
