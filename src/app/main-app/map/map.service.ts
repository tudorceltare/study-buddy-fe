import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {environment} from "../../../environments/environment";
import {Location} from "../../models/location.model";

@Injectable({
  providedIn: 'root'
})
export class MapService {
  url = environment.apiUrl;
  locationWhereMember = environment.apiEndpoints.locationsWhereMember;
  locationWhereAdmin = environment.apiEndpoints.locationsWhereAdmin;

  constructor(private http: HttpClient) { }

  getLocationsWhereMember():Observable<Location[]> {
    return this.http.get<Location[]>(this.url + this.locationWhereMember);
  }

  getLocationsWhereAdmin():Observable<Location[]> {
    return this.http.get<Location[]>(this.url + this.locationWhereAdmin);
  }
}
