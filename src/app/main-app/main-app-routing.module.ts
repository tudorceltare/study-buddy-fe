import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {MainAppComponent} from "./main-app.component";
import {DashboardComponent} from "./dashboard/dashboard.component";
import {RoleGuard} from "../guard/role.guard";
import {GroupsComponent} from "./groups/groups.component";
import {AuthenticationGuard} from "../guard/authentication.guard";

const routes: Routes = [
  {
    path: '',
    component: MainAppComponent,
    children: [
      {
        path: 'dashboard',
        component: DashboardComponent,
        canActivate: [RoleGuard, AuthenticationGuard]
      },
      {
        path: 'groups',
        component: GroupsComponent,
        canActivate: [RoleGuard]
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: [RoleGuard, AuthenticationGuard]
})
export class MainAppRoutingModule { }
