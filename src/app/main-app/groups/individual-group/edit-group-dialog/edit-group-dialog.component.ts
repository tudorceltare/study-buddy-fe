import {COMMA, ENTER} from '@angular/cdk/keycodes';
import {Component, ElementRef, Inject, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {GroupsService} from "../../groups.service";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {NotificationService} from "../../../../service/notification.service";
import {NotificationType} from "../../../../models/notificationType.enum";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {Group} from "../../../../models/group.model";
import {HttpErrorResponse} from "@angular/common/http";
import {Topic} from "../../../../models/topic.model";
import {MatChipInputEvent} from "@angular/material/chips";
import {MatAutocompleteSelectedEvent} from "@angular/material/autocomplete";
import {map, Observable, startWith} from "rxjs";
import {Location} from "../../../../models/location.model";

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
    topicsControl: new FormControl('')
  });
  @ViewChild('topicInput') topicInput!: ElementRef<HTMLInputElement>;
  topics: Topic[] = [];
  separatorKeysCodes: number[] = [ENTER, COMMA];
  allTopics: Topic[] = [];
  filteredTopics!: Observable<Topic[]>;

  group!: Group;
  displayGroup!: {
    id: string,
    name: string,
    description: string,
    location: string,
    topicNames: string[]
  };

  display: any;
  center: google.maps.LatLngLiteral = {
    lat: 24,
    lng: 12
  };
  zoom = 10;
  options: google.maps.MapOptions = {
    mapTypeId: 'hybrid',
  }
  markerOptions: google.maps.MarkerOptions = {
    draggable: false,
  }
  markerPosition!: google.maps.LatLngLiteral;

  constructor(
    private groupService: GroupsService,
    private dialogRef: MatDialogRef<EditGroupDialogComponent>,
    @Inject(MAT_DIALOG_DATA) data: any,
    private notificationService: NotificationService,
  ) {
    if(data.group) {
      this.group = data.group;
      this.displayGroup = {
        id: this.group.id,
        name: this.group.name,
        description: this.group.description,
        location: this.group.location.name,
        topicNames: this.group.topics.map(topic => topic.name)
      }
      this.markerPosition = {
        lat: this.group!.location.latitude,
        lng: this.group!.location.longitude
      }
      this.center = this.markerPosition;
      this.formGroup.patchValue(this.displayGroup);
      this.topics = [...this.group.topics];
      this.filteredTopics = this.formGroup.get('topicsControl')!.valueChanges.pipe(
        startWith(null),
        map((topicName: string | null) => topicName ? this._filter (topicName) : this.allTopics.slice())
      );
    }
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

  editGroup() {
    let group: Group = {
      id: this.formGroup.get('id')!.value,
      name: this.formGroup.get('name')!.value,
      description: this.formGroup.get('description')!.value,
      location: {
        id: this.group.location.id,
        name: this.formGroup.get('location')!.value,
        latitude: this.markerPosition.lat,
        longitude: this.markerPosition.lng
      },
      nextMeetingDate: new Date(),
      topics: this.topics
    }
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

  private _filter(value: string): Topic[] {
    const filterValue = value.toLowerCase();
    return this.allTopics.filter(topic => topic.name.toLowerCase().includes(filterValue));
  }

  capitalize(str: string): string {
    return str.replace(/\b\w/g, (char: string) => char.toUpperCase());
  }

  move(event: google.maps.MapMouseEvent) {
    if (event.latLng != null) this.display = event.latLng.toJSON();
  }

  addMarker(event: google.maps.MapMouseEvent) {
    if(event.latLng != null) this.markerPosition = event.latLng.toJSON();
  }
}
