import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input, OnChanges,
  OnInit,
  Output,
  ViewEncapsulation
} from '@angular/core';
import {GroupsService} from "../../groups.service";
import {FormControl, FormGroup} from "@angular/forms";
import {NotificationType} from "../../../../models/notificationType.enum";
import {NotificationService} from "../../../../service/notification.service";

@Component({
  selector: 'app-meetings-calendar',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './meetings-calendar.component.html',
  styleUrls: ['./meetings-calendar.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class MeetingsCalendarComponent implements OnInit{
  @Input() meetings: Date[] = [];
  @Input() authUserIsAdmin: boolean = false;
  @Input() groupId!: string;
  @Output() refresh = new EventEmitter();
  displayedColumns: string[] = ['date', 'delete'];
  dataSource:{ date: Date; isPast: boolean; }[] = [];
  dateFormGroup = new FormGroup({
    selectedDay: new FormControl<Date | null>(null)
  });

  constructor(private groupService: GroupsService, private notificationService: NotificationService) { }
  ngOnInit(): void {
    if(this.meetings.length > 0) {
      const now = new Date();
      for(let i = 0; i < this.meetings.length; i++) {
        let meetingDate = new Date(this.meetings[i]);
        this.dataSource.push({date: meetingDate, isPast: meetingDate.getTime() < now.getTime()});
      }
    }
  }

  addMeetingDate() {
    let dates: Date[] = [<Date>this.dateFormGroup.value.selectedDay];
    this.groupService.addMeetingDate(this.groupId, dates).subscribe((result) => {
      this.refresh.emit();
    }, error => {
      this.notificationService.notify(NotificationType.ERROR, error.error.message);
    });
  }

  deleteMeetingDate(element:any) {
    let dates: Date[] = [element];
    this.groupService.removeMeetingDate(this.groupId, dates).subscribe((result) => {
      this.refresh.emit();
    }, error => {
      this.notificationService.notify(NotificationType.ERROR, error.error.message);
    });
  }
}
