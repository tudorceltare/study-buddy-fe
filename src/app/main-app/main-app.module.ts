import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MainAppRoutingModule } from './main-app-routing.module';
import { DashboardComponent } from './dashboard/dashboard.component';
import {AuthenticationGuard} from "../guard/authentication.guard";
import {AuthenticationService} from "../service/authentication.service";
import {authInterceptorProvider} from "../interceptor/auth.interceptor-provider";
import { SidenavComponent } from './sidenav/sidenav.component';
import {MatButtonModule} from "@angular/material/button";
import {MatIconModule} from "@angular/material/icon";
import { GroupsComponent } from './groups/groups.component';
import {MatChipsModule} from "@angular/material/chips";


@NgModule({
  declarations: [
    DashboardComponent,
    SidenavComponent,
    GroupsComponent
  ],
    imports: [
        CommonModule,
        MainAppRoutingModule,
        MatButtonModule,
        MatIconModule,
        MatChipsModule
    ],
  exports: [
    SidenavComponent
  ],
  providers: [
    authInterceptorProvider,
    AuthenticationService,
    AuthenticationGuard,
    MainAppRoutingModule
  ]
})
export class MainAppModule { }
