import {TimeEntryType} from './time-entry-type.enum';

export interface TimeEntry {
  id: number,
  userId: string,
  userName: string,
  managerId: string,
  startDate: Date,
  endDate: Date,
  hours: number,
  status: string,
  type: TimeEntryType
}
