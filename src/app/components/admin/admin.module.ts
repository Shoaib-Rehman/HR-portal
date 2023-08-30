import { NgModule } from '@angular/core';
import { AdminRoutingModule } from './admin-routing.module';

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
import { NextYearObjectivesComponent } from './next-year-objectives/next-year-objectives.component';
import { CalibrationComponent } from './calibration/calibration.component';
import { AssignMembersListComponent } from './assign-members-list/assign-members-list.component';
import { SearchPipe } from 'src/app/pipes/search/search.pipe';
import { ProfileMenuComponent } from './profile-menu/profile-menu.component';

@NgModule({
  declarations: [
    HeaderComponent,
    SideBarComponent,
    ContentComponent,
    FooterComponent,
    AdminLayoutComponent,
    DishboardComponent,
    SelfAnnualAppraisalComponent,
    NextYearObjectivesComponent,
    AddEmployeeComponent,
    BellCurveComponent,
    AnnualApprsaialComponent,
    LaunchAppriasalComponent,
    UnlaunchedAppriasalEmployeeComponent,
    CustomToasterComponent,
    ComposeEmailComponent,
    AssignMembersComponent,
    AddEditAgencyComponent,
    SearchPipe,
    CalibrationComponent,
    AssignMembersListComponent,
    ProfileMenuComponent,
  ],
  imports: [
    SharedModule,
    AdminRoutingModule,
    ChartsModule,
    MatDialogModule,  
    MatDatepickerModule,
    MatInputModule,
    MatNativeDateModule,
    MatCardModule,
  ],
})
export class AdminModule {
  
}
