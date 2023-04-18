import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {GroupsService} from "../groups.service";
import {Group} from "../../../models/group.model";
import {NotificationService} from "../../../service/notification.service";
import {MatDialogRef} from "@angular/material/dialog";
import {NotificationType} from "../../../models/notificationType.enum";
import {HttpErrorResponse} from "@angular/common/http";

export interface CreateGroupDTO {
  name: string;
  description: string;
  location: string;
}

@Component({
  selector: 'app-add-group-dialog',
  templateUrl: './add-group-dialog.component.html',
  styleUrls: ['./add-group-dialog.component.scss']
})
export class AddGroupDialogComponent implements OnInit, OnDestroy{
  formGroup: FormGroup = new FormGroup({
    name: new FormControl('', [Validators.required]),
    description: new FormControl('', [Validators.required]),
    location: new FormControl('', [Validators.required]),
  });
  constructor(
    private groupService: GroupsService,
    private dialogRef: MatDialogRef<AddGroupDialogComponent>,
    private notificationService: NotificationService,
    ) { }

  ngOnInit(): void {
  }

  ngOnDestroy(): void {
  }

  creatGroup() {
    let group: CreateGroupDTO = this.formGroup.value;
    console.log(group);
    this.groupService.createGroup(group).subscribe(
      (response: Group) => {
        console.log(response);
        this.sendNotification(NotificationType.SUCCESS, "Group Created");
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
