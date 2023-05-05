import {User} from "./user.model";

export interface GroupDetails {
  id: string;
  name: string;
  description: string;
  location: string;
  admin: User;
  members: User[];
  meetingDates: Date[];
}
