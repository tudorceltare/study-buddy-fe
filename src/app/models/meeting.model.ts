import {Location} from "./location.model";

export interface Meeting {
  meetingDate: Date;
  location: Location;
  groupName: string;
  groupId: string;
}
