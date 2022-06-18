import {Component} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Router} from '@angular/router';
import {FormControl, FormGroup} from '@angular/forms';
import {TimeEntryTypeFormControlName} from './models/time-entry-type-form-control-name-enum';
import {environment} from '../../../environments/environment';
import {Route} from '../../route.enum';
import {take} from 'rxjs/operators';
import {TimeEntryType} from '../../shared/models/time-entry-type.interface';

@Component({
  selector: 'app-time-entry-type',
  templateUrl: './time-entry-type.component.html',
  styleUrls: ['./time-entry-type.component.css']
})
export class TimeEntryTypeComponent {
  readonly timeEntryTypeFormControlName: typeof TimeEntryTypeFormControlName = TimeEntryTypeFormControlName;
  formGroup: FormGroup;
  id: number;

  constructor(private readonly httpClient: HttpClient,
              private readonly router: Router) {
    this.id = this.router.getCurrentNavigation()?.extras.state!['id'];
    this.formGroup = new FormGroup({
      [TimeEntryTypeFormControlName.Name]: new FormControl<string | null>(null)
    });
    this.httpClient.get<TimeEntryType>(`${environment.backendUrl}/${Route.TimeEntryTypes}/${this.id}`)
      .pipe(take(1))
      .subscribe({
        next: (timeEntryType: TimeEntryType) => {
          this.formGroup.get(TimeEntryTypeFormControlName.Name)!.setValue(timeEntryType.name);
        }
      });
  }

  onTimeEntryTypeUpdateClick(): void {
    this.httpClient.put(`${environment.backendUrl}/${Route.TimeEntryTypes}/${this.id}`, this.formGroup.value)
      .pipe(take(1))
      .subscribe({
        next: () => {
          this.router.navigate([Route.TimeEntryTypes]);
        }
      });
  }
}
