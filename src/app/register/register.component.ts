import {Component} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {HttpClient} from '@angular/common/http';
import {take} from 'rxjs/operators';
import {environment} from '../../environments/environment';
import {RegisterFormControlName} from './models/register-form-control-name-enum';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  error?: string;
  formGroup: FormGroup;

  constructor(private readonly httpClient: HttpClient) {
    this.formGroup = new FormGroup({
      [RegisterFormControlName.Username]:
        new FormControl<string | null>(null, [Validators.required, Validators.minLength(8)]),
      [RegisterFormControlName.Password]:
        new FormControl<string | null>(null, [Validators.required, Validators.minLength(8)])
    });
  }

  register(): void {
    if (this.formGroup.invalid) {
      this.error = 'Form input is invalid.';
      return;
    }
    this.httpClient.post(`${environment.backendUrl}/register`, this.formGroup.value)
      .pipe(take(1))
      .subscribe();

  }
}
