import {User} from "./user.model";
import {Topic} from "./topic.model";
import {Location} from "./location.model";

export interface GroupDetails {
  id: string;
  name: string;
  description: string;
  location: Location;
  admin: User;
  members: User[];
  meetingDates: Date[];
  topics: Topic[];
}
