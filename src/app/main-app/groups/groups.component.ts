import {Component, OnInit} from '@angular/core';
import {MatDialog, MatDialogConfig} from "@angular/material/dialog";
import {GroupsService} from "./groups.service";
import {AddGroupDialogComponent} from "./add-group-dialog/add-group-dialog.component";
import {FormControl} from "@angular/forms";
import {Group} from "../../models/group.model";
import {Router} from "@angular/router";

@Component({
  selector: 'app-groups',
  templateUrl: './groups.component.html',
  styleUrls: ['./groups.component.scss']
})

export class GroupsComponent implements OnInit{
  public groups: Group[] = [];
  groupsControl = new FormControl('all');
  constructor(
    private dialog: MatDialog,
    private router: Router,
    private groupService: GroupsService
  ) {}
  ngOnInit(): void {
    this.loadGroups();
  }

  getAllGroups(): void {
    this.groupService.getGroups().subscribe((results:Group[]) => {
      this.groups = results;
    });
  }

  getGroupsWhereMember(): void {
    this.groupService.getGroupsWhereMember().subscribe((results) => {
      this.groups = results;
    });
  }

  getGroupsWhereAdmin(): void {
    this.groupService.getGroupsWhereAdmin().subscribe((results) => {
      this.groups = results;
    });
  }

  loadGroups(): void {
    switch (this.groupsControl.value) {
      case 'all':
        this.getAllGroups();
        break;
      case 'member':
        this.getGroupsWhereMember();
        break;
      case 'admin':
        this.getGroupsWhereAdmin();
        break;
    }
  }

  openAddGroupDialog($event: MouseEvent) {
    this.stopPropagation($event);
    const dialogConfig = new MatDialogConfig();
    dialogConfig.width = '80%'
    dialogConfig.height = '90%'
    dialogConfig.autoFocus = false;
    dialogConfig.disableClose = false;
    const dialogRef = this.dialog.open(AddGroupDialogComponent, dialogConfig);
    dialogRef.afterClosed().subscribe(
      status => {
        if (status) {
          this.getAllGroups();
        }
      }
    );
  }

  stopPropagation(event: MouseEvent) {
    event.stopPropagation();
  }

  clickOnCard(id: string) {
    this.router.navigate(['/groups/', id]);
  }

  capitalize(str: string): string {
    return str.replace(/\b\w/g, (char: string) => char.toUpperCase());
  }
}
