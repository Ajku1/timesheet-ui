import {Component, OnInit} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {FormControl, FormGroup} from '@angular/forms';
import {TimeEntryFormControlName} from './models/time-entry-form-control-name-enum';
import {environment} from '../../../environments/environment';
import {Route} from '../../route.enum';
import {take} from 'rxjs/operators';

@Component({
  selector: 'app-time-entry',
  templateUrl: './time-entry.component.html',
  styleUrls: ['./time-entry.component.css']
})
export class TimeEntryComponent implements OnInit {
  readonly timeEntryFormControlName: typeof TimeEntryFormControlName = TimeEntryFormControlName;
  formGroup: FormGroup;

  constructor(private readonly httpClient: HttpClient) {
    this.formGroup = new FormGroup(
      {
        [TimeEntryFormControlName.Date]: new FormControl<Date>(new Date()),
        [TimeEntryFormControlName.Hours]: new FormControl<number>(0)
      }
    );
  }

  ngOnInit(): void {
  }

  onTimeEntryCreate(): void {
    this.httpClient.post(`${environment.backendUrl}/${Route.TimeEntries}`, this.formGroup.value)
      .pipe(take(1))
      .subscribe({
        next: () => {

        }
      });
  }

}
