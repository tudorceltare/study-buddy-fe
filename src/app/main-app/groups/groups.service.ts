import { Injectable } from '@angular/core';
import {environment} from "../../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {Group} from "../../models/group.model";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class GroupsService {
  url = environment.apiUrl;
  groups = environment.apiEndpoints.groups;
  groupCreate = environment.apiEndpoints.groupCreate;
  groupUpdate = environment.apiEndpoints.groupUpdate;
  groupDelete = environment.apiEndpoints.groupDelete;
  groupMembers = environment.apiEndpoints.groupMembers;
  groupWhereMember = environment.apiEndpoints.groupWhereMember;
  groupWhereAdmin = environment.apiEndpoints.groupWhereAdmin;
  groupJoin = environment.apiEndpoints.groupJoin;
  groupLeave = environment.apiEndpoints.groupLeave;
  constructor(private http: HttpClient) { }

  getGroups(): Observable<Group[]> {
    return this.http.get<Group[]>(this.url + this.groups);
  }

  getGroupWithId(id: string): Observable<Group> {
    return this.http.get<Group>(this.url + this.groups + id);
  }

  getGroupsWhereMember(): Observable<Group[]> {
    return this.http.get<Group[]>(this.url + this.groupWhereMember);
  }

  getGroupsWhereAdmin(): Observable<Group[]> {
    return this.http.get<Group[]>(this.url + this.groupWhereAdmin);
  }

  createGroup(group: {name: string; description: string; location: string;}): Observable<Group> {
    return this.http.post<Group>(this.url + this.groupCreate, group);
  }

}
