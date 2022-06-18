import {UserModel} from '../../shared/models/user.model.interface';
import {TimeEntryType} from '../../shared/models/time-entry-type.interface';

export interface TimeEntry {
  id: number,
  userId: string,
  user: UserModel,
  managerId: string,
  manager: UserModel,
  startDate: Date,
  endDate: Date,
  hours: number,
  status: string,
  type: TimeEntryType
}
