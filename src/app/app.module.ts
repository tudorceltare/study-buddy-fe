import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LogInComponent } from './log-in/log-in.component';
import { RegisterComponent } from './register/register.component';
import {authInterceptorProvider} from "./interceptor/auth.interceptor-provider";
import {AuthenticationService} from "./service/authentication.service";
import {AuthenticationGuard} from "./guard/authentication.guard";
import {MatCardModule} from "@angular/material/card";
import {ReactiveFormsModule} from "@angular/forms";
import {MatInputModule} from "@angular/material/input";
import {MatButtonModule} from "@angular/material/button";
import {NotifierModule} from "angular-notifier";
import {MatSelectModule} from "@angular/material/select";
import {NotificationModule} from "./notification/notification.module";
import {MatIconModule} from "@angular/material/icon";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatToolbarModule} from "@angular/material/toolbar";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {HttpClientModule} from "@angular/common/http";
import { MainAppComponent } from './main-app/main-app.component';
import {MainAppModule} from "./main-app/main-app.module";

@NgModule({
  declarations: [
    AppComponent,
    LogInComponent,
    RegisterComponent,
    MainAppComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatCardModule,
    MatFormFieldModule,
    MatButtonModule,
    MatInputModule,
    ReactiveFormsModule,
    MatIconModule,
    NotifierModule,
    NotificationModule,
    MatSelectModule,
    MainAppModule
  ],
  providers: [
    authInterceptorProvider,
    AuthenticationService,
    AuthenticationGuard,
    AppRoutingModule
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
