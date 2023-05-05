import { Injectable } from '@angular/core';
import {environment} from "../../../environments/environment";
import {HttpClient, HttpHeaders, HttpParams} from "@angular/common/http";
import {Group} from "../../models/group.model";
import {Observable} from "rxjs";
import {GroupDetails} from "../../models/group-details.model";

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
  groupKick = environment.apiEndpoints.groupKick;
  groupPromote = environment.apiEndpoints.groupPromote;
  groupAddMeetingDates = environment.apiEndpoints.groupAddMeetingDates;
  groupRemoveMeetingDates = environment.apiEndpoints.groupRemoveMeetingDates;
  constructor(private http: HttpClient) { }

  getGroups(): Observable<Group[]> {
    return this.http.get<Group[]>(this.url + this.groups);
  }

  getGroupWithId(id: string): Observable<GroupDetails> {
    return this.http.get<GroupDetails>(this.url + this.groups + id);
  }

  getGroupsWhereMember(): Observable<Group[]> {
    return this.http.get<Group[]>(this.url + this.groupWhereMember);
  }

  getGroupsWhereAdmin(): Observable<Group[]> {
    return this.http.get<Group[]>(this.url + this.groupWhereAdmin);
  }

  getGroupMembers(groupId: string): Observable<Group> {
    return this.http.get<Group>(this.url + this.groupMembers + groupId);
  }

  createGroup(group: {name: string; description: string; location: string;}): Observable<Group> {
    return this.http.post<Group>(this.url + this.groupCreate, group);
  }

  updateGroup(group: Group): Observable<Group> {
    return this.http.post<Group>(this.url + this.groupUpdate, group);
  }

  deleteGroup(groupId: string): Observable<Group> {
    return this.http.delete<Group>(this.url + this.groupDelete + groupId);
  }

  joinGroup(groupId: string): Observable<Group> {
    return this.http.post<Group>(this.url + this.groupJoin + groupId, null);
  }

  leaveGroup(groupId: string): Observable<Group> {
    return this.http.post<Group>(this.url + this.groupLeave + groupId, null);
  }

  kickUser(groupId: string, userId: string) {
    const headers = new HttpHeaders({ 'Content-Type': 'application/x-www-form-urlencoded' });
    const body = new HttpParams()
      .set('groupId', groupId)
      .set('userId', userId);
    return this.http.post(this.url + this.groupKick, body, {headers: headers});

  }

  promoteToAdmin(groupId: string, userId: string) {
    const headers = new HttpHeaders({ 'Content-Type': 'application/x-www-form-urlencoded' });
    const body = new HttpParams()
      .set('groupId', groupId)
      .set('userId', userId);
    return this.http.post(this.url + this.groupPromote, body, {headers: headers});
  }

  addMeetingDate(groupId: string, meetingDates: Date[]) {
    return this.http.post(this.url + this.groupAddMeetingDates, {groupId: groupId, meetingDates: meetingDates});
  }

  removeMeetingDate(groupId: string, meetingDates: Date[]) {
    return this.http.post(this.url + this.groupRemoveMeetingDates, {groupId: groupId, meetingDates: meetingDates});
  }
}
