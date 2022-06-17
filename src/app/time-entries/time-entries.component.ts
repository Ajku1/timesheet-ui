import {Component, OnInit} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {TimeEntry} from './models/time-entry.interface';
import {environment} from '../../environments/environment';
import {Route} from '../route.enum';
import {take} from 'rxjs/operators';
import {UserService} from '../shared/services/user.service';
import {UserModel} from '../shared/models/user.model.interface';

@Component({
  selector: 'app-time-entries',
  templateUrl: './time-entries.component.html',
  styleUrls: ['./time-entries.component.css']
})
export class TimeEntriesComponent implements OnInit {
  timeEntries: TimeEntry[] = [];

  constructor(private readonly httpClient: HttpClient,
              private readonly userService: UserService) {
  }

  ngOnInit(): void {
    this.userService.user$.subscribe((loggedInUser: UserModel | null) => {
      this.httpClient.get<TimeEntry[]>(`${environment.backendUrl}/${Route.TimeEntries}/pending-review/${loggedInUser!.id}`)
        .pipe(take(1))
        .subscribe({
          next: (timeEntries: TimeEntry[]) => {
            this.timeEntries = timeEntries;
          }
        });
    });

  }

  onTimeEntryActionClick(timeEntryId: number, approved: boolean): void {
    const body = {TimeEntryId: timeEntryId, Approved: approved};
    const loggedInUser = this.userService.getLoggedInUser();
    this.httpClient.post(`${environment.backendUrl}/${Route.TimeEntries}/pending-review`, body)
      .pipe(take(1))
      .subscribe({
        next: () => {

        }
      });
  }
}
