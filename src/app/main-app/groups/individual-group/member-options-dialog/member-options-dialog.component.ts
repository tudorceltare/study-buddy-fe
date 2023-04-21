import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {GroupsService} from "../../groups.service";
import {NotificationService} from "../../../../service/notification.service";
import {User} from "../../../../models/user.model";
import {NotificationType} from "../../../../models/notificationType.enum";
import {HttpErrorResponse} from "@angular/common/http";

@Component({
  selector: 'app-member-options-dialog',
  templateUrl: './member-options-dialog.component.html',
  styleUrls: ['./member-options-dialog.component.scss']
})
export class MemberOptionsDialogComponent implements OnInit{
  user!: User;
  groupId!: string;
  constructor(
    private dialogRef: MatDialogRef<MemberOptionsDialogComponent>,
    @Inject(MAT_DIALOG_DATA) data: any,
    private notificationService: NotificationService,
    private groupService: GroupsService
  ) {
    if(data.user) {
      this.user = data.user;
    }
    if(data.groupId) {
      this.groupId = data.groupId;
    }
  }

  ngOnInit() {
  }

  kickUser() {
    // this.groupService.kickUser(this.groupId, this.user.id).subscribe(() => {
    //   this.dialogRef.close(true);
    //   this.sendNotification(NotificationType.INFO, "User kicked successfully");
    // }, (errorResponse: HttpErrorResponse) => {
    //   console.log(errorResponse.error);
    //   this.sendNotification(NotificationType.ERROR, errorResponse.error.message);
    // });
    this.dialogRef.close(true);
    this.sendNotification(NotificationType.INFO, "User kicked successfully");
  }

  makeAdmin() {
    // this.groupService.makeAdmin(this.groupId, this.user.id).subscribe(() => {
    //   this.dialogRef.close(true);
    //   this.sendNotification(NotificationType.INFO, "User made admin successfully");
    // }, (errorResponse: HttpErrorResponse) => {
    //   console.log(errorResponse.error);
    //   this.sendNotification(NotificationType.ERROR, errorResponse.error.message);
    // });
    this.dialogRef.close(true);
    this.sendNotification(NotificationType.SUCCESS, this.user.firstName + " " + this.user.lastName + " made admin successfully");
  }

  getAvatarInitials(person: User) : string {
    let firstName = person.firstName;
    let lastName = person.lastName;
    return firstName[0] + lastName[0];
  }

  angleOfGradient(username: string): number {
    let sum = 0;
    for (let i = 0; i < username.length; i++) {
      sum += username.charCodeAt(i);
    }
    return sum % 360;
  }

  invertHexColor(hex: string): string {
    if (hex.indexOf('#') === 0) {
      hex = hex.slice(1);
    }
    // convert 3-digit hex to 6-digits.
    if (hex.length === 3) {
      hex = hex[0] + hex[0] + hex[1] + hex[1] + hex[2] + hex[2];
    }
    if (hex.length !== 6) {
      throw new Error('Invalid HEX color.');
    }
    let r = (255 - parseInt(hex.slice(0, 2), 16)).toString(16),
      g = (255 - parseInt(hex.slice(2, 4), 16)).toString(16),
      b = (255 - parseInt(hex.slice(4, 6), 16)).toString(16);
    return '#' + this.padZero(r) + this.padZero(g) + this.padZero(b);
  }

  private padZero(str: string) {
    let len = 2;
    let zeros = new Array(len).join('0');
    return (zeros + str).slice(-len);
  }
  private sendNotification(notificationType: NotificationType, message: string) {
    if (message) {
      this.notificationService.notify(notificationType, message);
    } else {
      this.notificationService.notify(notificationType, "An error occurred. Please try again");
    }
  }

}
