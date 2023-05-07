import {Topic} from "./topic.model";

export interface Group {
  id: string;
  name: string;
  description: string;
  location: string;
  nextMeetingDate: Date;
  topics: Topic[];
}
