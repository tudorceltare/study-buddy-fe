import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {GroupsService} from "../groups.service";
import {User} from "../../../models/user.model";
import {AuthenticationService} from "../../../service/authentication.service";
import {GroupDetails} from "../../../models/group-details.model";
import {MatDialog, MatDialogConfig} from "@angular/material/dialog";
import {MemberOptionsDialogComponent} from "./member-options-dialog/member-options-dialog.component";
import {NotificationService} from "../../../service/notification.service";
import {NotificationType} from "../../../models/notificationType.enum";
import {DeleteGroupDialogComponent} from "./delete-group-dialog/delete-group-dialog.component";
import {LeaveGroupDialogComponent} from "./leave-group-dialog/leave-group-dialog.component";

@Component({
  selector: 'app-individual-group',
  templateUrl: './individual-group.component.html',
  styleUrls: ['./individual-group.component.scss']
})
export class IndividualGroupComponent implements OnInit {
  groupId!: string;
  loggedInUser!: User;
  group!: GroupDetails | undefined;
  loading: boolean = false;
  authUserIsAdmin: boolean = false;
  displayedColumns: string[] = ['avatar', 'firstname', 'lastname', 'username', 'email', 'options'];

  constructor(
    private router: Router,
    private dialog: MatDialog,
    private route: ActivatedRoute,
    private groupService: GroupsService,
    private authenticationService: AuthenticationService,
    private notificationService: NotificationService
  ) {
    this.loggedInUser = <User>this.authenticationService.getUserFromLocalCache();
  }
  ngOnInit(): void {
    this.loading = true;
    this.groupId = this.route.snapshot.params['id'];
    this.groupService.getGroupWithId(this.groupId).subscribe((result) => {
      this.group = result;
      this.checkIfAdmin()
      console.log(this.group);
    });
    this.loading = false;
  }

  checkIfAdmin() {
    const user: User | null = this.authenticationService.getUserFromLocalCache();
    if (this.group!.admin.id === user!.id) {
      this.authUserIsAdmin = true;
    }
  }

  checkIfUserIsAMember() {
    const user: User | null = this.authenticationService.getUserFromLocalCache();
    return !!this.group!.members.find(member => member.id === user!.id);
  }

  openMemberOptionsDialog($event: MouseEvent) {
    this.stopPropagation($event);
    const dialogConfig = new MatDialogConfig();
    // dialogConfig.width = '50%'
    // dialogConfig.height = '30%'
    dialogConfig.autoFocus = false;
    dialogConfig.disableClose = false;
    const dialogRef = this.dialog.open(MemberOptionsDialogComponent, dialogConfig);
    dialogRef.afterClosed().subscribe(
      status => {
        if (status) {
          this.ngOnInit();
        }
      }
    );
  }

  stopPropagation(event: MouseEvent) {
    event.stopPropagation();
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

  joinGroup() {
    this.groupService.joinGroup(this.groupId).subscribe(() => {
      this.sendNotification(NotificationType.SUCCESS, "You have successfully joined the group");
      this.ngOnInit();
      console.log(this.group?.members);
    });
  }

  openDeleteGroupDialog(id: string) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.data = { id };
    dialogConfig.autoFocus = false;
    const dialogRef = this.dialog.open(DeleteGroupDialogComponent, dialogConfig);
    dialogRef.afterClosed().subscribe(
      status => {
        if(status) {
          console.log("status");
          this.router.navigateByUrl('groups')
        }
      });
  }

  openLeaveGroupDialog(id: string) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.data = { id };
    dialogConfig.autoFocus = false;
    const dialogRef = this.dialog.open(LeaveGroupDialogComponent, dialogConfig);
    dialogRef.afterClosed().subscribe(
      status => {
        if(status) {
          console.log("status");
          this.router.navigateByUrl('groups')
        }
      });
  }

}


const sleep = (milliseconds: number) => {
  return new Promise(resolve => setTimeout(resolve, milliseconds))
}
