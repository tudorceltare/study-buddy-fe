import {Component, OnInit,} from '@angular/core';
import {ScheduleCalendarService} from "./schedule-calendar.service";
import {NotificationService} from "../../service/notification.service";
import {Meeting} from "../../models/meeting.model";
import {FormControl} from "@angular/forms";
import {NotificationType} from "../../models/notificationType.enum";

@Component({
  selector: 'app-schedule-calendar',
  templateUrl: './schedule-calendar.component.html',
  styleUrls: ['./schedule-calendar.component.scss']
})
export class ScheduleCalendarComponent implements OnInit{
  meetingsControl = new FormControl('member');
  nextMeetings: Meeting[] = []
  displayedColumns: string[] = ['name', 'date', 'location'];
  checked = false;
  constructor(
    private scheduleCalendarService: ScheduleCalendarService,
    private notificationService: NotificationService
  ) {
  }
  ngOnInit(): void {
    this.loadNextMeetings();
  }

  loadNextMeetings(): void {
    this.nextMeetings = [];
    switch (this.meetingsControl.value) {
      case 'member':
        this.getNextMeetingsWhereMember();
        break;
      case 'admin':
        this.getNextMeetingsWhereAdmin();
        break;
      default:
        this.getNextMeetingsWhereMember();
    }
  }

  private getNextMeetingsWhereMember() {
    this.scheduleCalendarService.getMeetingsWhereMember().subscribe((results) => {
      this.nextMeetings = results;
        if (this.checked) {
          this.filterPastMeetings();
        }
      this.sortMeetingsByDate();
    },
      (error) => {
        console.log(error);
        this.notificationService.notify(NotificationType.ERROR, error.error.message)
      }
    );
  }

  private getNextMeetingsWhereAdmin() {
    this.scheduleCalendarService.getMeetingsWhereAdmin().subscribe((results) => {
      this.nextMeetings = results;
      if (this.checked) {
        this.filterPastMeetings();
      }
      this.sortMeetingsByDate();
    },
      (error) => {
        console.log(error);
        this.notificationService.notify(NotificationType.ERROR, error.error.message)
      }
    );
  }

  sortMeetingsByDate(): void {
    this.nextMeetings.sort((a, b) => {
      let dateA = new Date(a.meetingDate);
      let dateB = new Date(b.meetingDate);
      return dateA.getTime() - dateB.getTime();
    });
  }

  filterPastMeetings(): void {
    let currentDate = new Date();
    this.nextMeetings = this.nextMeetings.filter(meeting => {
      let meetingDate = new Date(meeting.meetingDate);
      return meetingDate.getTime() >= currentDate.getTime();
    });
  }

  checkIfPastMeetings(meeting: Meeting): boolean {
    let currentDate = new Date();
    let meetingDate = new Date(meeting.meetingDate);
    return meetingDate.getTime() < currentDate.getTime();
  }
}
