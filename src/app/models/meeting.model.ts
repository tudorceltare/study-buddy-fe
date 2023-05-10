import {Location} from "./location.model";

export interface Meeting {
  date: Date;
  location: Location;
  groupName: string;
  groupId: string;
}
