import { Injectable } from '@angular/core';
import {environment} from "../../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {Meeting} from "../../models/meeting.model";

@Injectable({
  providedIn: 'root'
})
export class ScheduleCalendarService {
  url = environment.apiUrl;
  meetingWhereMember = environment.apiEndpoints.meetingsWhereMember;
  meetingWhereAdmin = environment.apiEndpoints.meetingsWhereAdmin;

  constructor(private http: HttpClient) { }

  getMeetingsWhereMember() {
    return this.http.get<Meeting[]>(this.url + this.meetingWhereMember);
  }

  getMeetingsWhereAdmin() {
    return this.http.get<Meeting[]>(this.url + this.meetingWhereAdmin);
  }
}
