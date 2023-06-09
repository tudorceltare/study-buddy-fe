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
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MatInputModule} from "@angular/material/input";
import {MatButtonToggleModule} from "@angular/material/button-toggle";
import { IndividualGroupComponent } from './groups/individual-group/individual-group.component';
import {MatProgressSpinnerModule} from "@angular/material/progress-spinner";
import {MatTableModule} from "@angular/material/table";
import { MemberOptionsDialogComponent } from './groups/individual-group/member-options-dialog/member-options-dialog.component';
import { DeleteGroupDialogComponent } from './groups/individual-group/delete-group-dialog/delete-group-dialog.component';
import { LeaveGroupDialogComponent } from './groups/individual-group/leave-group-dialog/leave-group-dialog.component';
import { EditGroupDialogComponent } from './groups/individual-group/edit-group-dialog/edit-group-dialog.component';
import { MeetingsCalendarComponent } from './groups/individual-group/meetings-calendar/meetings-calendar.component';
import { ScheduleCalendarComponent } from './schedule-calendar/schedule-calendar.component';
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {MatDatepickerModule} from "@angular/material/datepicker";
import {MatNativeDateModule} from "@angular/material/core";
import {MatCardModule} from "@angular/material/card";
import {MatMenuModule} from "@angular/material/menu";
import {MatAutocompleteModule} from "@angular/material/autocomplete";
import {GoogleMapsModule} from "@angular/google-maps";
import { MapComponent } from './map/map.component';
import {MatCheckboxModule} from "@angular/material/checkbox";

@NgModule({
  declarations: [
    DashboardComponent,
    SidenavComponent,
    GroupsComponent,
    AddGroupDialogComponent,
    IndividualGroupComponent,
    MemberOptionsDialogComponent,
    DeleteGroupDialogComponent,
    LeaveGroupDialogComponent,
    EditGroupDialogComponent,
    MeetingsCalendarComponent,
    ScheduleCalendarComponent,
    MapComponent
  ],
  imports: [
    BrowserAnimationsModule,
    CommonModule,
    MainAppRoutingModule,
    MatButtonModule,
    MatIconModule,
    MatChipsModule,
    MatDialogModule,
    ReactiveFormsModule,
    MatInputModule,
    MatButtonToggleModule,
    MatProgressSpinnerModule,
    MatTableModule,
    MatNativeDateModule,
    FormsModule,
    MatDatepickerModule,
    MatCardModule,
    MatMenuModule,
    MatAutocompleteModule,
    GoogleMapsModule,
    MatCheckboxModule
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
