import {Component} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Router} from '@angular/router';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {TimeEntryTypeFormControlName} from './models/time-entry-type-form-control-name-enum';
import {environment} from '../../../environments/environment';
import {Route} from '../../route.enum';
import {take} from 'rxjs/operators';
import {TimeEntryType} from '../../shared/models/time-entry-type.interface';
import {Observable} from 'rxjs';

@Component({
  selector: 'app-time-entry-type',
  templateUrl: './time-entry-type.component.html',
  styleUrls: ['./time-entry-type.component.css']
})
export class TimeEntryTypeComponent {
  readonly timeEntryTypeFormControlName: typeof TimeEntryTypeFormControlName = TimeEntryTypeFormControlName;
  formGroup: FormGroup;
  id?: number;

  constructor(private readonly httpClient: HttpClient,
              private readonly router: Router) {
    this.id = this.router.getCurrentNavigation()?.extras.state?.['id'];
    this.formGroup = new FormGroup({
      [TimeEntryTypeFormControlName.Name]: new FormControl<string | null>(null, Validators.required)
    });
    if (this.id) {
      this.httpClient.get<TimeEntryType>(`${environment.backendUrl}/${Route.TimeEntryTypes}/${this.id}`)
        .pipe(take(1))
        .subscribe({
          next: (timeEntryType: TimeEntryType) => {
            this.formGroup.get(TimeEntryTypeFormControlName.Name)!.setValue(timeEntryType.name);
          }
        });
    }
  }

  onTimeEntryTypeSubmitClick(): void {
    if (this.formGroup.invalid) {
      return;
    }
    const timeEntryTypeSubmitObservable: Observable<TimeEntryType> = this.id === undefined ?
      this.httpClient.post<TimeEntryType>(`${environment.backendUrl}/${Route.TimeEntryTypes}`, this.formGroup.value) :
      this.httpClient.put<TimeEntryType>(`${environment.backendUrl}/${Route.TimeEntryTypes}/${this.id}`, this.formGroup.value);

    timeEntryTypeSubmitObservable.pipe(take(1))
      .subscribe({
        next: () => {
          this.router.navigate([Route.TimeEntryTypes]);
        }
      });
  }
}
