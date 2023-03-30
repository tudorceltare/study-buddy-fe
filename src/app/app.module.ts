import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LogInComponent } from './log-in/log-in.component';
import { RegisterComponent } from './register/register.component';
import {authInterceptorProvider} from "./interceptor/auth.interceptor-provider";
import {AuthenticationService} from "./service/authentication.service";
import {AuthenticationGuard} from "./guard/authentication.guard";

@NgModule({
  declarations: [
    AppComponent,
    LogInComponent,
    RegisterComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
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
