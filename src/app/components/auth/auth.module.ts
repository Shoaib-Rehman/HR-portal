import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login/login.component';
import { OtpComponent } from './otp/otp.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { AuthLayoutComponent } from './auth-layout/auth-layout.component';
import { AuthRoutingModule } from './auth-routing.module';
import { SharedModule } from '../shared/shared.module';



@NgModule({
  declarations: [
    LoginComponent,
    OtpComponent,
    SignUpComponent,
    AuthLayoutComponent
  ],
  imports: [
    SharedModule,
    AuthRoutingModule,
  ]
})
export class AuthModule { }
