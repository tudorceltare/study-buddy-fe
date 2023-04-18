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
import { AddGroupDialogComponent } from './groups/add-group-dialog/add-group-dialog.component';
import {MatDialogModule} from "@angular/material/dialog";
import {ReactiveFormsModule} from "@angular/forms";
import {MatInputModule} from "@angular/material/input";
import {MatButtonToggleModule} from "@angular/material/button-toggle";
import { IndividualGroupComponent } from './groups/individual-group/individual-group.component';
import {MatProgressSpinnerModule} from "@angular/material/progress-spinner";


@NgModule({
  declarations: [
    DashboardComponent,
    SidenavComponent,
    GroupsComponent,
    AddGroupDialogComponent,
    IndividualGroupComponent
  ],
    imports: [
        CommonModule,
        MainAppRoutingModule,
        MatButtonModule,
        MatIconModule,
        MatChipsModule,
        MatDialogModule,
        ReactiveFormsModule,
        MatInputModule,
        MatButtonToggleModule,
        MatProgressSpinnerModule
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
