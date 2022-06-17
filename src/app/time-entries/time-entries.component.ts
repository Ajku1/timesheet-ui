import {Component, OnInit} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {TimeEntry} from './models/time-entry.interface';
import {environment} from '../../environments/environment';
import {Route} from '../route.enum';
import {take} from 'rxjs/operators';
import {TimeEntryType} from './models/time-entry-type.enum';

@Component({
  selector: 'app-time-entries',
  templateUrl: './time-entries.component.html',
  styleUrls: ['./time-entries.component.css']
})
export class TimeEntriesComponent implements OnInit {
  timeEntries: TimeEntry[] = [
    {
      Id: 5,
      UserId: 2,
      ManagerId: 3,
      Date: new Date(),
      Hours: 5,
      Status: 'PENDING',
      Type: TimeEntryType.Work
    },
    {
      Id: 5,
      UserId: 2,
      ManagerId: 3,
      Date: new Date(),
      Hours: 5,
      Status: 'PENDING',
      Type: TimeEntryType.StudyBreak
    },
    {
      Id: 5,
      UserId: 2,
      ManagerId: 3,
      Date: new Date(),
      Hours: 5,
      Status: 'APPROVED',
      Type: TimeEntryType.StudyBreak
    },
    {
      Id: 5,
      UserId: 2,
      ManagerId: 3,
      Date: new Date(),
      Hours: 5,
      Status: 'APPROVED',
      Type: TimeEntryType.Holiday
    }
  ];

  constructor(private readonly httpClient: HttpClient) {
  }

  ngOnInit(): void {
    // this.httpClient.get<TimeEntry[]>(`${environment.backendUrl}/${Route.TimeEntries}`)
    //   .pipe(take(1))
    //   .subscribe({
    //     next: (timeEntries: TimeEntry[]) => {
    //       this.timeEntries = timeEntries;
    //     }
    //   });
  }

  onTimeEntryActionClick(timeEntryId: number, approved: boolean): void {
    const body = {TimeEntryId: timeEntryId, Approved: approved};
    this.httpClient.post(`${environment.backendUrl}/${Route.TimeEntries}/pending-review}`, body)
      .pipe(take(1))
      .subscribe({
        next: () => {

        }
      });
  }
}
