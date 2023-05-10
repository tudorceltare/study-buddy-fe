import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {NotificationService} from "../../../../service/notification.service";
import {GroupsService} from "../../groups.service";
import {NotificationType} from "../../../../models/notificationType.enum";
import {HttpErrorResponse} from "@angular/common/http";

@Component({
  selector: 'app-leave-group-dialog',
  templateUrl: './leave-group-dialog.component.html',
  styleUrls: ['./leave-group-dialog.component.scss']
})
export class LeaveGroupDialogComponent implements OnInit {
  id!: string;
  constructor(
    private dialogRef: MatDialogRef<LeaveGroupDialogComponent>,
    @Inject(MAT_DIALOG_DATA) data: any,
    private notificationService: NotificationService,
    private groupService: GroupsService
  ) {
    if(data.id) {
      this.id = data.id;
    }
  }

  ngOnInit() {
  }

  leaveGroup() {
    this.groupService.leaveGroup(this.id).subscribe(() => {
      this.dialogRef.close(true);
      this.notificationService.notify(NotificationType.INFO, "You have left the group successfully");
    }, (errorResponse: HttpErrorResponse) => {
      console.log(errorResponse.error);
      this.notificationService.notify(NotificationType.ERROR, errorResponse.error.message);
    });
  }
}
