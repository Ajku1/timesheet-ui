import {Component} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {TimeEntryFormControlName} from './models/time-entry-form-control-name-enum';
import {environment} from '../../../environments/environment';
import {Route} from '../../route.enum';
import {take} from 'rxjs/operators';
import {Router} from '@angular/router';
import {UserService} from '../../shared/services/user.service';
import {TimeEntryType} from '../../shared/models/time-entry-type.interface';

@Component({
  selector: 'app-time-entry',
  templateUrl: './time-entry.component.html',
  styleUrls: ['./time-entry.component.css']
})
export class TimeEntryComponent {
  readonly timeEntryFormControlName: typeof TimeEntryFormControlName = TimeEntryFormControlName;
  formGroup: FormGroup;
  timeEntryTypes: TimeEntryType[] = [];

  constructor(private readonly httpClient: HttpClient,
              private readonly router: Router,
              private readonly userService: UserService) {
    this.formGroup = new FormGroup(
      {
        [TimeEntryFormControlName.StartDate]: new FormControl<Date>(new Date(), Validators.required),
        [TimeEntryFormControlName.EndDate]: new FormControl<Date>(new Date(), Validators.required),
        [TimeEntryFormControlName.Hours]: new FormControl<number>(0, Validators.min(1)),
        [TimeEntryFormControlName.Type]: new FormControl<TimeEntryType | null>(null, Validators.required)
      }
    );
    this.httpClient.get<TimeEntryType[]>(`${environment.backendUrl}/${Route.TimeEntryTypes}`)
      .pipe(take(1))
      .subscribe({
        next: (timeEntryTypes: TimeEntryType[]) => {
          this.timeEntryTypes = timeEntryTypes;
        }
      });
  }

  onTimeEntryCreate(): void {
    if (this.formGroup.invalid) {
      return;
    }
    const loggedInUser = this.userService.getLoggedInUser();
    this.httpClient.post(`${environment.backendUrl}/${Route.TimeEntries}`, {
      ...this.formGroup.value,
      UserId: loggedInUser.id,
      ManagerId: loggedInUser.managerId
    })
      .pipe(take(1))
      .subscribe({
        next: () => {
          this.router.navigate([Route.TimeEntries]);
        }
      });
  }

}
