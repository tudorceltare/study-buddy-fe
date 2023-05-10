import {Topic} from "./topic.model";
import {Location} from "./location.model";

export interface Group {
  id: string;
  name: string;
  description: string;
  location: Location;
  nextMeetingDate: Date;
  topics: Topic[];
}
