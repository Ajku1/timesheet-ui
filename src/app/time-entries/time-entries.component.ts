import {Component, OnDestroy, OnInit} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {TimeEntry} from './models/time-entry.interface';
import {environment} from '../../environments/environment';
import {Route} from '../route.enum';
import {take, takeUntil} from 'rxjs/operators';
import {UserService} from '../shared/services/user.service';
import {UserModel} from '../shared/models/user.model.interface';
import {Subject} from 'rxjs';
import {TimeEntryStatus} from './models/time-entry-status.enum';

@Component({
  selector: 'app-time-entries',
  templateUrl: './time-entries.component.html',
  styleUrls: ['./time-entries.component.css']
})
export class TimeEntriesComponent implements OnInit, OnDestroy {
  readonly timeEntryStatus: typeof TimeEntryStatus = TimeEntryStatus;
  timeEntries: TimeEntry[] = [];
  user: UserModel | null = null;
  componentDestroyed: Subject<void> = new Subject<void>();
  statusCodes: Map<number, TimeEntryStatus> = new Map<number, TimeEntryStatus>([
    [0, TimeEntryStatus.Pending],
    [1, TimeEntryStatus.Denied],
    [2, TimeEntryStatus.Approved]
  ]);

  constructor(private readonly httpClient: HttpClient,
              private readonly userService: UserService) {
    this.userService.user$
      .pipe(takeUntil(this.componentDestroyed))
      .subscribe({
        next: (user: UserModel | null) => {
          this.user = user;
        }
      });
  }

  ngOnInit(): void {
    const body = {userId: this.user?.id};
    this.httpClient.post<TimeEntry[]>(`${environment.backendUrl}/${Route.TimeEntries}/pending-review`, body)
      .pipe(take(1))
      .subscribe({
        next: (timeEntries: TimeEntry[]) => {
          this.timeEntries = timeEntries.map(timeEntry => this.mapEntry(timeEntry));
        }
      });
  }

  ngOnDestroy(): void {
    this.componentDestroyed.next();
    this.componentDestroyed.complete();
  }

  onTimeEntryActionClick(timeEntryId: number, approved: boolean): void {
    this.httpClient.put<TimeEntry>(`${environment.backendUrl}/${Route.TimeEntries}/${timeEntryId}/pending-review`, {approved})
      .pipe(take(1))
      .subscribe({
        next: (updatedEntry: TimeEntry) => {
          const updatedEntryIndex = this.timeEntries.findIndex(timeEntry => timeEntry.id === updatedEntry.id);
          const mappedUpdatedEntry = this.mapEntry(updatedEntry);
          this.timeEntries.splice(updatedEntryIndex, 1, mappedUpdatedEntry);
        }
      });
  }

  private mapEntry(timeEntry: TimeEntry): TimeEntry {
    const status = this.statusCodes.get(timeEntry.status as unknown as number)!;
    return {...timeEntry, status};
  }
}
