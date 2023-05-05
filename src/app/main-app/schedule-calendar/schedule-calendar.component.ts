import {
  Component,
  ViewChild,
  TemplateRef,
} from '@angular/core';
@Component({
  selector: 'app-schedule-calendar',
  templateUrl: './schedule-calendar.component.html',
  styleUrls: ['./schedule-calendar.component.scss']
})
export class ScheduleCalendarComponent {
  @ViewChild('modalContent', { static: true }) modalContent!: TemplateRef<any>;

}
