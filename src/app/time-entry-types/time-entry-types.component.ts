import {Component, OnInit} from '@angular/core';
import {Route} from '../route.enum';
import {HttpClient} from '@angular/common/http';
import {Router} from '@angular/router';
import {TimeEntryType} from '../shared/models/time-entry-type.interface';
import {environment} from '../../environments/environment';
import {take} from 'rxjs/operators';

@Component({
  selector: 'app-time-entry-types',
  templateUrl: './time-entry-types.component.html',
  styleUrls: ['./time-entry-types.component.css']
})
export class TimeEntryTypesComponent implements OnInit {
  timeEntryTypes: TimeEntryType[] = [];

  constructor(private readonly httpClient: HttpClient,
              private readonly router: Router) {
  }

  ngOnInit(): void {
    this.httpClient.get<TimeEntryType[]>(`${environment.backendUrl}/${Route.TimeEntryTypes}`)
      .pipe(take(1))
      .subscribe({
        next: (timeEntryTypes: TimeEntryType[]) => {
          this.timeEntryTypes = timeEntryTypes;
        }
      });
  }

  onTimeEntryTypeEditClick(id: number): void {
    this.router.navigate([Route.TimeEntryType, id], {state: {id}});
  }

  onTimeEntryTypeDeleteClick(id: number): void {
    this.httpClient.delete(`${environment.backendUrl}/${Route.TimeEntryTypes}/${id}`)
      .pipe(take(1))
      .subscribe({
        next: () => {
          this.timeEntryTypes = this.timeEntryTypes.filter(timeEntryType => timeEntryType.id !== id);
        }
      });
  }
}
