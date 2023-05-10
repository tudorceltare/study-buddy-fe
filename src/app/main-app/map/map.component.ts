import {Component, OnInit} from '@angular/core';
import {MapService} from "./map.service";
import {Location} from "../../models/location.model";
import {FormControl} from "@angular/forms";
import {NotificationType} from "../../models/notificationType.enum";
import {NotificationService} from "../../service/notification.service";

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})
export class MapComponent implements OnInit {
  meetingLocations: Location[] = [];
  locationsControl = new FormControl('member');

  display: any;
  center: google.maps.LatLngLiteral = {
    lat: 24,
    lng: 12
  };
  zoom = 4;
  markerOptions: google.maps.MarkerOptions = {
    draggable: false,
  }
  markerPositions: google.maps.LatLngLiteral[] = [];
  constructor(
    private mapService :MapService,
    private notificationService: NotificationService
    ) {}
  ngOnInit(): void {
    this.loadLocations();
  }


  getLocationsWhereMember(): void {
    this.mapService.getLocationsWhereMember().subscribe((results) => {
      this.meetingLocations = results;
      this.markerPositions = [];
      for (let i = 0; i < this.meetingLocations.length; i++) {
        let lat = this.meetingLocations[i].latitude;
        let lng = this.meetingLocations[i].longitude;
        this.markerPositions.push({lat, lng});
      }
    },
      (error) => {
        console.log(error);
        this.notificationService.notify(NotificationType.ERROR, error.error.message)
      }
    );
  }
  getLocationsWhereAdmin(): void {
    this.mapService.getLocationsWhereAdmin().subscribe((results) => {
      this.meetingLocations = results;
      this.markerPositions = [];
      for (let i = 0; i < this.meetingLocations.length; i++) {
        let lat = this.meetingLocations[i].latitude;
        let lng = this.meetingLocations[i].longitude;
        this.markerPositions.push({lat, lng});
      }
    });
  }

  loadLocations(): void {
    switch (this.locationsControl.value) {
      case 'admin':
        this.getLocationsWhereAdmin();
        break;
      case 'member':
        this.getLocationsWhereMember();
        break;
      default:
        this.getLocationsWhereMember();
    }
  }
}
