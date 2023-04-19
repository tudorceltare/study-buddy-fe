import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {NotificationService} from "../../../../service/notification.service";
import {NotificationType} from "../../../../models/notificationType.enum";
import {GroupsService} from "../../groups.service";
import {HttpErrorResponse} from "@angular/common/http";

@Component({
  selector: 'app-delete-group-dialog',
  templateUrl: './delete-group-dialog.component.html',
  styleUrls: ['./delete-group-dialog.component.scss']
})
export class DeleteGroupDialogComponent implements OnInit {

  id: string = '';
  constructor(
    private dialogRef: MatDialogRef<DeleteGroupDialogComponent>,
    @Inject(MAT_DIALOG_DATA) data: any,
    private notificationService: NotificationService,
    private groupService: GroupsService
  ) {
    if (data.id) {
      this.id = data.id;
    }
  }

  ngOnInit(): void {
  }

  deleteGroup(){
    this.groupService.deleteGroup(this.id).subscribe(() => {
      this.dialogRef.close(true);
      this.sendNotification(NotificationType.INFO, "Group deleted successfully");
    }, (errorResponse: HttpErrorResponse) => {
      console.log(errorResponse.error);
      this.sendNotification(NotificationType.ERROR, errorResponse.error.message);
    });
  }

  private sendNotification(notificationType: NotificationType, message: string) {
    if (message) {
      this.notificationService.notify(notificationType, message);
    } else {
      this.notificationService.notify(notificationType, "An error occurred. Please try again");
    }
  }
}
