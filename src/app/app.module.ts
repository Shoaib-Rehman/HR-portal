import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AuthService } from './services/auth/auth.service';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { ToasterService } from './services/toaster/toaster.service';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { LoadingService } from './services/loader/loader.service';
import { LoaderComponent } from './components/common/loader/loader.component';
import { LoadingInterceptor } from './interceptors/loading/loading.interceptor';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { PageNotFoundComponent } from './components/common/page-not-found/page-not-found.component';
import { NgxsModule } from '@ngxs/store';
import { AuthState } from './store/auth/auth.store';
import { AuthInterceptor } from './interceptors/auth/auth.interceptor';
import { ErrorComponent } from './components/common/error/error.component';

@NgModule({
  declarations: [AppComponent, LoaderComponent, PageNotFoundComponent, ErrorComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatSnackBarModule,
    MatProgressSpinnerModule,
    HttpClientModule,
    NgxsModule.forRoot([AuthState]),
  ],
  providers: [
    AuthService, 
    ToasterService, 
    LoadingService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: LoadingInterceptor,
      multi: true
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
