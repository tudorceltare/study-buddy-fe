import {Component, OnInit} from '@angular/core';
import {MatDialog, MatDialogConfig} from "@angular/material/dialog";
import {GroupsService} from "./groups.service";
import {AddGroupDialogComponent} from "./add-group-dialog/add-group-dialog.component";
import {FormControl} from "@angular/forms";
import {Group} from "../../models/group.model";
import {Router} from "@angular/router";

interface DummyType {
  name: string;
  description: string;
  location: string;
  date: Date;
  interests?: string[];
}

const DummyData: DummyType[] = [
  {
    name: 'Chemistry Group',
    description:'Lorem ipsum dolor sit amet, consectetur ' +
      'adipiscing elit. Aenean posuere suscipit massa, eu aliquam nisl aliquet eget. ' +
      'Sed at facilisis dui, a luctus mauris. Nunc sit amet nibh dui.',
    location: 'Str. Avram Iancu 42, Cluj-Napoca, Romania',
    date: new Date(2023, 0O5, 0O5, 17, 0, 0, 0),
    interests: ['Chemistry', 'Biology', 'Physics']
  },
  {
    name: 'Math Group :)',
    description:'Lorem ipsum dolor sit amet, consectetur ' +
      'adipiscing elit. Aenean posuere suscipit massa, eu aliquam nisl aliquet eget',
    location: 'Str. Avram Iancu 42, Cluj-Napoca, Romania',
    date: new Date(2023, 0O5, 0O5, 17, 0, 0, 0),
    interests: ['Math', 'Physics', 'Computer Science']
  },
  {
    name: 'SCS is Fun!',
    description:'Lorem ipsum dolor sit amet, consectetur ' +
      'adipiscing elit. Aenean posuere suscipit massa, eu aliquam nisl aliquet eget. ' +
      'Sed at facilisis dui, a luctus mauris. Nunc sit amet nibh dui.',
    location: 'Str. Avram Iancu 42, Cluj-Napoca, Romania',
    date: new Date(2023, 0O5, 0O5, 17, 0, 0, 0),
    interests: ['Computer Science', 'Math', 'Systems Engineering']
  },
  {
    name: 'Marcus\' group',
    description:'Lorem ipsum dolor sit amet, consectetur ' +
      'adipiscing elit. Aenean posuere suscipit massa, eu aliquam nisl aliquet eget. ' +
      'Sed at facilisis dui, a luctus mauris. Nunc sit amet nibh dui.',
    location: 'Str. Avram Iancu 42, Cluj-Napoca, Romania',
    date: new Date(2023, 0O5, 0O5, 17, 0, 0, 0),
    interests: ['Computer Science', 'Math', 'Linear Algebra']
  },
  {
    name: 'Martin\'s group',
    description:'Lorem ipsum dolor sit amet, consectetur ' +
      'adipiscing elit. Aenean posuere suscipit massa, eu aliquam nisl aliquet eget. ' +
      'Sed at facilisis dui, a luctus mauris. Nunc sit amet nibh dui.',
    location: 'Str. Avram Iancu 42, Cluj-Napoca, Romania',
    date: new Date(2023, 0O5, 0O5, 17, 0, 0, 0),
    interests: ['Computer Science', 'Linear Algebra', 'Mathematical Analysis']
  },
  {
    name: 'Maria\'s group',
    description:'Lorem ipsum dolor sit amet, consectetur ' +
      'adipiscing elit. Aenean posuere suscipit massa, eu aliquam nisl aliquet eget. ' +
      'Sed at facilisis dui, a luctus mauris. Nunc sit amet nibh dui.',
    location: 'Str. Avram Iancu 42, Cluj-Napoca, Romania',
    date: new Date(2023, 0O5, 0O5, 17),
    interests: ['Computer Science', 'Linear Algebra', 'Mathematical Analysis']
  }
];

@Component({
  selector: 'app-groups',
  templateUrl: './groups.component.html',
  styleUrls: ['./groups.component.scss']
})

export class GroupsComponent implements OnInit{
  public dummyData = DummyData;
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
    this.groupService.getGroups().subscribe((results) => {
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
}
