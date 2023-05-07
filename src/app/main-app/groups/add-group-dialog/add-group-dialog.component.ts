import {Component, ElementRef, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {GroupsService} from "../groups.service";
import {Group} from "../../../models/group.model";
import {NotificationService} from "../../../service/notification.service";
import {MatDialogRef} from "@angular/material/dialog";
import {NotificationType} from "../../../models/notificationType.enum";
import {HttpErrorResponse} from "@angular/common/http";
import {Topic} from "../../../models/topic.model";
import {COMMA, ENTER} from "@angular/cdk/keycodes";
import {map, Observable, startWith} from "rxjs";
import {MatChipInputEvent} from "@angular/material/chips";
import {MatAutocompleteSelectedEvent} from "@angular/material/autocomplete";

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
    topicsControl: new FormControl('')
  });
  @ViewChild('topicInput') topicInput!: ElementRef<HTMLInputElement>;
  topics: Topic[] = [];
  separatorKeysCodes: number[] = [ENTER, COMMA];
  allTopics: Topic[] = [];

  constructor(
    private groupService: GroupsService,
    private dialogRef: MatDialogRef<AddGroupDialogComponent>,
    private notificationService: NotificationService,
    ) {
  }

  ngOnInit(): void {
    this.groupService.getTopics().subscribe(
      (response: Topic[]) => {
        this.allTopics = response;
      }, (errorResponse: HttpErrorResponse) => {
        console.log(errorResponse.error);
        this.sendNotification(NotificationType.ERROR, errorResponse.error.message);
      }
    );
  }

  ngOnDestroy(): void {
    this.topics = [];
  }

  creatGroup() {
    let group: Group = {
      id: '',
      name: this.formGroup.get('name')!.value,
      description: this.formGroup.get('description')!.value,
      location: this.formGroup.get('location')!.value,
      nextMeetingDate: new Date(),
      topics: this.topics
    }
    console.log(group);
    this.groupService.createGroup(group).subscribe(
      () => {
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

  addTopic(event: MatChipInputEvent) {
    const input = event.chipInput;
    const value = (event.value || '').trim();

    if (value) {
      let topic: Topic = {
        id: '',
        name: value.toLowerCase(),
        description: ''
      }
      if (!this.topics.includes(topic)) {
        this.topics.push(topic);
      }
    }
    input!.clear();
    this.formGroup.get('topicsControl')?.setValue(null);
  }

  removeTopic(topic: Topic) {
    const index = this.topics.indexOf(topic);
    if (index >= 0) {
      this.topics.splice(index, 1);
    }
  }

  selected($event: MatAutocompleteSelectedEvent) {
    if (!this.topics.includes($event.option.value)){
      this.topics.push($event.option.value);
    }
    this.topicInput.nativeElement.value = '';
    this.formGroup.get('topicsControl')?.setValue(null);
  }
  capitalize(str: string): string {
    return str.replace(/\b\w/g, (char: string) => char.toUpperCase());
  }
}
