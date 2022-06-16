import {Component} from '@angular/core';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {environment} from '../../environments/environment';
import {take} from 'rxjs/operators';
import {Router} from '@angular/router';
import {Route} from '../route.enum';
import {LoginFormControlName} from './models/LoginFormControlName';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  readonly loginFormControlName: typeof LoginFormControlName = LoginFormControlName;
  formGroup: FormGroup;
  error?: string;

  constructor(private readonly httpClient: HttpClient,
              private readonly router: Router) {
    this.formGroup = new FormGroup<any>({
      [LoginFormControlName.Username]: new FormControl(null, [Validators.required]),
      [LoginFormControlName.Password]: new FormControl(null, [Validators.required, Validators.minLength(8)])
    });
  }

  login(): void {
    if (this.formGroup.valid) {
      this.httpClient.post(`${environment.backendUrl}/${Route.Login}`, this.formGroup.value)
        .pipe(take(1))
        .subscribe({
          next: () => {
            this.router.navigate([Route.TimeEntries]);
          },
          error: (error: HttpErrorResponse) => {
            if (error.status === 401) {
              this.error = 'Wrong username/password!';
            }
          }
        });
    }
  }
}
