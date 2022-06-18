import {TimeEntryType} from './time-entry-type.enum';
import {UserModel} from '../../shared/models/user.model.interface';

export interface TimeEntry {
  id: number,
  userId: string,
  user: UserModel,
  managerId: string,
  startDate: Date,
  endDate: Date,
  hours: number,
  status: string,
  type: TimeEntryType
}
