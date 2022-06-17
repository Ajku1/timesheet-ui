import {Component} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {FormControl, FormGroup} from '@angular/forms';
import {TimeEntryFormControlName} from './models/time-entry-form-control-name-enum';
import {environment} from '../../../environments/environment';
import {Route} from '../../route.enum';
import {take} from 'rxjs/operators';
import {TimeEntryType} from '../models/time-entry-type.enum';
import {Router} from '@angular/router';
import {UserService} from '../../shared/services/user.service';

@Component({
  selector: 'app-time-entry',
  templateUrl: './time-entry.component.html',
  styleUrls: ['./time-entry.component.css']
})
export class TimeEntryComponent {
  readonly timeEntryFormControlName: typeof TimeEntryFormControlName = TimeEntryFormControlName;
  formGroup: FormGroup;
  timeEntryTypes: string[] = Object.keys(TimeEntryType);

  constructor(private readonly httpClient: HttpClient,
              private readonly router: Router,
              private readonly userService: UserService) {
    this.formGroup = new FormGroup(
      {
        [TimeEntryFormControlName.StartDate]: new FormControl<Date>(new Date()),
        [TimeEntryFormControlName.EndDate]: new FormControl<Date>(new Date()),
        [TimeEntryFormControlName.Hours]: new FormControl<number>(0)
      }
    );
  }


  onTimeEntryCreate(): void {
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
