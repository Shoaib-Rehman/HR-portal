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
import { BellCurveComponent } from './bell-curve/bell-curve.component';
import { ChartsModule } from 'ng2-charts';
import { AnnualApprsaialComponent } from './annual-apprsaial/annual-apprsaial.component';
import { LaunchAppriasalComponent } from './launch-appriasal/launch-appriasal.component';
import { MatDialogModule } from '@angular/material/dialog';
import { UnlaunchedAppriasalEmployeeComponent } from './unlaunched-appriasal-employee/unlaunched-appriasal-employee.component';
import { CustomToasterComponent } from './custom-toaster/custom-toaster.component';
import { ComposeEmailComponent } from './compose-email/compose-email.component';
import { MatInputModule } from '@angular/material/input';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { AssignMembersComponent } from './assign-members/assign-members.component';
import { MatCardModule } from '@angular/material/card';
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
    AnnualApprsaialComponent,
    LaunchAppriasalComponent,
    UnlaunchedAppriasalEmployeeComponent,
    CustomToasterComponent,
    ComposeEmailComponent,
    AssignMembersComponent,
  ],
  imports: [
    SharedModule,
    AdminRoutingModule,
    ChartsModule,
    MatDialogModule,  
    MatDatepickerModule,
    MatInputModule,
    MatNativeDateModule,
    MatCardModule
  ],
})
export class AdminModule {
  
}
