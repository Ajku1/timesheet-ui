import {TimeEntryType} from './time-entry-type.enum';

export interface TimeEntry {
  Id: number,
  UserId: number,
  ManagerId: number,
  Date: Date,
  Hours: number,
  Status: string,
  Type: TimeEntryType
}
