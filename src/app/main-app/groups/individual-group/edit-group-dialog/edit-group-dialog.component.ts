import {Component, Inject, OnDestroy, OnInit} from '@angular/core';
import {GroupsService} from "../../groups.service";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {NotificationService} from "../../../../service/notification.service";
import {NotificationType} from "../../../../models/notificationType.enum";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {Group} from "../../../../models/group.model";
import {HttpErrorResponse} from "@angular/common/http";

@Component({
  selector: 'app-edit-group-dialog',
  templateUrl: './edit-group-dialog.component.html',
  styleUrls: ['./edit-group-dialog.component.scss']
})
export class EditGroupDialogComponent implements OnInit, OnDestroy {

  formGroup: FormGroup = new FormGroup({
    id: new FormControl('', [Validators.required]),
    name: new FormControl('', [Validators.required]),
    description: new FormControl('', [Validators.required]),
    location: new FormControl('', [Validators.required]),
  });

  group!: Group;
  constructor(
    private groupService: GroupsService,
    private dialogRef: MatDialogRef<EditGroupDialogComponent>,
    @Inject(MAT_DIALOG_DATA) data: any,
    private notificationService: NotificationService,
  ) {
    if(data.group) {
      this.group = data.group;
      this.formGroup.patchValue(this.group);
    }
  }

  ngOnInit(): void {
  }

  ngOnDestroy(): void {
  }

  editGroup() {
    let group: Group = this.formGroup.value;
    this.groupService.updateGroup(group).subscribe(
      (response: Group) => {
        console.log(response);
        this.sendNotification(NotificationType.SUCCESS, "Group Edited");
        this.dialogRef.close(true);
      },
      (errorResponse: HttpErrorResponse) => {
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
